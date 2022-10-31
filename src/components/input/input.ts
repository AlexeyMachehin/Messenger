import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { inputTemplate } from "./inputTemplate";

export default class Input extends Block {
  constructor(props: Props) {
    super("input", {
      ...props,
      class: ["general-input"]
    });
  }

  render(): DocumentFragment {
    return this.compile(inputTemplate, this.props);
  }
}
