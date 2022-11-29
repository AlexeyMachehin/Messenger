import Block from "../../utils/block";
import { messagesListTemplate } from "./messagesListTemplate";
import { CommonProps } from "../../utils/models/props";
import Message from "../message/message";

type MessagesListType = {
  timeHeader: string;
  messages: Message[];
} & CommonProps;

export default class MessagesList extends Block<MessagesListType> {
  constructor(props: MessagesListType) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(messagesListTemplate, this.props);
  }
}
