import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { iconButtonTemplate } from "./iconButtonTemplate";

export default class IconButton extends Block {
  constructor(props: Props) {
    super("button", props);
  }

  render(): DocumentFragment {
    return this.compile(iconButtonTemplate, this.props);
  }
}
