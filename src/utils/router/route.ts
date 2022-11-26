import Block from "../block";
import { BlockConstructor } from "../models/class-type";
import { Props } from "../models/props";
import { render } from "../renderDOM";

export default class Route {
  private _pathname: string;
  private _blockClass: BlockConstructor<Props>;
  private _block: Block<Props> | null;
  private _props: { rootQuery: string };
  constructor(
    pathname: string,
    view: BlockConstructor<Props>,
    props: { rootQuery: string }
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render(): void {
    this._block = new this._blockClass(this._props);
    render(this._props.rootQuery, this._block);
  }
}
