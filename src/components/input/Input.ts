import Block from "../../utils/Block";
import { inputTemplate } from "./inputTemplate";
import { CommonProps } from "../../utils/models/props";

export class Input extends Block<CommonProps> {
  constructor(props: CommonProps) {
    super("input", {
      ...props,
      class: ["general-input"],
    });
  }

  render(): DocumentFragment {
    return this.compile(inputTemplate, this.props);
  }
}
