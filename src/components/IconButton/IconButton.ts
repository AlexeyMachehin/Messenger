import Block from "../../utils/Block";
import { iconButtonTemplate } from "./iconButtonTemplate";
import { CommonProps } from "../../utils/models/props";

export class IconButton extends Block<CommonProps> {
  constructor(props: CommonProps) {
    super("button", props);
  }

  render(): DocumentFragment {
    return this.compile(iconButtonTemplate, this.props);
  }
}
