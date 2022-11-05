import Block from "../../utils/block";
import { messagesListTemplate } from "./messagesListTemplate";
import { Props } from "../../utils/models/props";
import Message from "../message/message";

type MessagesListType = {
  timeHeader: string;
  messages: Message[];
} & Props;

export default class MessagesList extends Block<MessagesListType> {
  constructor(props: MessagesListType) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(messagesListTemplate, this.props);
  }
}
