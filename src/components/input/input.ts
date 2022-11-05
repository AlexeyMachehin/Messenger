import Block from "../../utils/block";
import { inputTemplate } from "./inputTemplate";
import { Props } from "../../utils/models/props";

export default class Input extends Block<Props> {
  constructor(props: Props) {
    super("input", {
      ...props,
      class: ["general-input"],
    });
  }

  render(): DocumentFragment {
    return this.compile(inputTemplate, this.props);
  }
}
