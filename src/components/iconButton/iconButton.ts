import Block from "../../utils/block";
import { iconButtonTemplate } from "./iconButtonTemplate";
import { CommonProps } from "../../utils/models/props";

export default class IconButton extends Block<CommonProps> {
  constructor(props: CommonProps) {
    super("button", props);
  }

  render(): DocumentFragment {
    return this.compile(iconButtonTemplate, this.props);
  }
}
