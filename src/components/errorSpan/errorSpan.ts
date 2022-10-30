import { compile } from "pug";
import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { errorSpanTemplate } from "./errorSpanTemplate";

export default class Avatar extends Block {
  constructor(props: Props & { errorText: string }) {
    super("span", { ...props, class: "error-span" });
  }

  render(): DocumentFragment {
    return this.compile(errorSpanTemplate, this.props);
  }
}
