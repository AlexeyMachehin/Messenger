import { Block } from "../../utils/Block";
import { messageTemplate } from "./messageTemplate";
import { CommonProps } from "../../utils/models/props";
import { AvatarType } from "../avatar/Avatar";

type MessageType = {
  message: string;
  time: string;
  name: string | number;
  className: string;
  avatar: Block<AvatarType>;
} & CommonProps;

export class Message extends Block<MessageType> {
  constructor(props: MessageType) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(messageTemplate, this.props);
  }
}
