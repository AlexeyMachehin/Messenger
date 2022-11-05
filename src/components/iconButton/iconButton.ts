import Block from "../../utils/block";
import { iconButtonTemplate } from "./iconButtonTemplate";
import { Props } from "../../utils/models/props";

export default class IconButton extends Block<Props> {
  constructor(props: Props) {
    super("button", props);
  }

  render(): DocumentFragment {
    return this.compile(iconButtonTemplate, this.props);
  }
}
