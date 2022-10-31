import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { messageTemplate } from "./messageTemplate";

export default class Message extends Block {
  constructor(
    props: Props & {
      message: string;
      time: string;
      name: string;
      className: string;
      avatar: Block;
    }
  ) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(messageTemplate, this.props);
  }
}
