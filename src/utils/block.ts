import { CommonProps } from "./models/props";
import { Events } from "./models/events";
import { EventBus } from "./eventBus";
import { v4 as makeUUID } from "uuid";
import { compile } from "pug";

type Children = { [key: string]: Block<{}> | Block<{}>[] };

class Block<T extends CommonProps> extends EventBus {
  private _element: HTMLElement | null = null;

  private _meta: {
    tagName: keyof HTMLElementTagNameMap | null;
    propsAndChildren?: T;
  } = {
    tagName: null,
  };
  children: Children;
  private _id;
  props: T;

  constructor(
    tagName: keyof HTMLElementTagNameMap = "div",
    propsAndChildren: T
  ) {
    super();
    this._meta = {
      tagName,
      propsAndChildren,
    };

    const { children } = this._getChildren(propsAndChildren);

    this.children = children;

    this._id = makeUUID();

    this.props = this._makePropsProxy({ ...propsAndChildren, _id: this._id });

    this._registerEvents();
    this.emit(Events.INIT);
  }

  private _registerEvents(): void {
    this.on(Events.INIT, this.init.bind(this));
    this.on(Events.FLOW_CDM, this._componentDidMount.bind(this));
    this.on(Events.FLOW_RENDER, this._render.bind(this));
    this.on(Events.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _createResources(): void {
    const { tagName } = this._meta;
    if (tagName != null) {
      this._element = this._createDocumentElement(tagName);
    }
  }

  init(): void {
    this._createResources();
    this.emit(Events.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((item) => item.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  componentDidMount(): void {
    this.addAttribute();
  }

  dispatchComponentDidMount(): void {
    this.emit(Events.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: CommonProps, newProps: CommonProps): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.emit(Events.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: CommonProps, newProps: CommonProps): boolean {
    return oldProps !== newProps;
  }

  setProps = (nextProps: CommonProps): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const block = this.render();
    this._removeEvents();

    if (this._element != null) this._element.innerHTML = "";

    if (typeof block === "object") {
      Array.from(block.children).forEach((child) => {
        this._element?.appendChild(child);
      });
    } else {
      this._element?.insertAdjacentHTML("beforeend", block);
    }
    this._addEvents();
  }

  render(): DocumentFragment {
    return document.createElement("template").content;
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: T): T {
    return new Proxy(props, {
      get(target: T, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target: T, prop: string, value: any) => {
        if (target[prop] !== value) {
          (target as Record<string, any>)[prop] = value;
          this._meta.propsAndChildren = this.props;
          this.emit(Events.FLOW_CDU, this._meta.propsAndChildren, target);
        }
        return true;
      },
      deleteProperty: () => {
        throw new Error("Нет доступа");
      },
    });
  }

  private _createDocumentElement<F extends keyof HTMLElementTagNameMap>(
    tagName: F
  ): HTMLElementTagNameMap[F] {
    const element = document.createElement(tagName);
    if (this.props.class != null) {
      element.classList.add(...this.props.class);
    }
    if (this._meta.propsAndChildren?.settings?.withInternalID ?? true) {
      element.setAttribute("data-id", this._id);
    }
    return element;
  }

  show(): void {
    (this.getContent() as HTMLElement).style.display = "flex";
  }

  hide(): void {
    if (this.element?.parentElement) {
      this.element.parentElement.innerHTML = "";
      this._removeEvents();
    }
  }

  private _addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName], true);
    });
  }

  private _removeEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private _getChildren(propsAndChildren: CommonProps): {
    children: Children;
    props: CommonProps;
  } {
    const children: Children = {};
    const props = {} as Record<string, any>;

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (
        Array.isArray(value) &&
        value.every((item) => item instanceof Block)
      ) {
        children[key] = value;
      }

      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  compile(template: string, props: CommonProps): DocumentFragment {
    this.children = this._getChildren(props).children;
    const propsAndStubs = { ...props };
    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(
          (item) => `<div data-id="${item._id}"></div>`
        );
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement("template");
    const regexp = compile(template)(propsAndStubs);
    fragment.innerHTML = regexp;
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((item) => {
          const stub = fragment.content.querySelector(
            `[data-id="${item._id}"]`
          );
          const content = item.getContent();
          if (content != null) stub?.replaceWith(content);
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        const content = child.getContent();
        if (content != null) stub?.replaceWith(content);
      }
    });
    return fragment.content;
  }

  addAttribute(): void {
    const { attr = {} } = this.props;
    Object.entries<string | number | boolean>(attr).forEach(([key, value]) => {
      this._element?.setAttribute(key, value.toString());
    });
  }
}

export default Block;
