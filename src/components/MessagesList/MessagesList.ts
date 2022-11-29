import Block from "../../utils/Block";
import { messagesListTemplate } from "./messagesListTemplate";
import { CommonProps } from "../../utils/models/props";
import {Message} from "../Message/Message";

type MessagesListType = {
  timeHeader: string;
  messages: Message[];
} & CommonProps;

export class MessagesList extends Block<MessagesListType> {
  constructor(props: MessagesListType) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(messagesListTemplate, this.props);
  }
}
