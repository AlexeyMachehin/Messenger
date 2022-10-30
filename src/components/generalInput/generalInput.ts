import { compile } from "pug";
import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { generalInputTemplate } from "./generalInputTemplate";

export default class GeneralInput extends Block {
  constructor(
    props: Props & {
      label: string;
      type: string;
      name: string;
      errorText: string;
    
    }
  ) {
    super("div", { ...props, class: "general-input-wrapper" });
  }

  render(): DocumentFragment {
    return this.compile(generalInputTemplate, this.props);
  }
}
