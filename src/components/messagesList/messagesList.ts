import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import Message from "../message/message";
import { messagesListTemplate } from "./messagesListTemplate";

export default class MessagesList extends Block {
  constructor(
    props: Props & {
      timeHeader: string;
      messages: Message[];
    }
  ) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(messagesListTemplate, this.props);
  }
}
