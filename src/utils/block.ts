import { compile, compileTemplate } from "pug";
import EventBus from "./eventBus";

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  _element: HTMLElement;
  _meta: {
    template: string;
    props: {};
  };
  props: any;
  eventBus: () => EventBus;

  constructor(template: string, props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      template,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    // eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    // eventBus.on(Block.EVENTS.FLOW_UPDATE, this._componentDidUpdate.bind(this));
  }

  _createResources(): void {
    const { template } = this._meta;
    this._element = this._createDocumentElement(template);
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // _componentDidMount() {
  //   this.componentDidMount();
  // }

  // componentDidMount(oldProps) {}

  // dispatchComponentDidMount() {
  //   this.eventBus().emit(Block.EVENTS.FLOW_CDM, _);
  // }

  // _componentDidUpdate(oldProps, newProps) {
  //   const response = this.componentDidUpdate(oldProps, newProps);
  //   this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  // }

  // componentDidUpdate(oldProps, newProps) {
  //   this.props = newProps;
  //   return true;
  // }

  setProps = (nextProps: {}) => {
    if (!nextProps) {
      return;
    }
    // this.eventBus().emit(Block.EVENTS.FLOW_UPDATE, this.props, nextProps);
    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element;
  }

  _render() {
    const block = this.render();
    // this._element.innerHTML = block;
  }

  render(): compileTemplate {
    return compile('<div></div>');
  }

  getContent(): HTMLElement {
    console.log(this.element)
    return this.element;
  }

  _makePropsProxy(props: {}): {} {
    const proxy = new Proxy(props, {
      deleteProperty: function () {
        throw new Error("нет доступа");
      },
    });
    return proxy;
  }

  _createDocumentElement(template: string): HTMLElement {
    console.log(template)
    return compile(template);
  }

}
