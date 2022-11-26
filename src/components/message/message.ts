import Block from "../../utils/block";
import { messageTemplate } from "./messageTemplate";
import { Props } from "../../utils/models/props";
import { AvatarType } from "./../avatar/avatar";

type MessageType = {
  message: string;
  time: string;
  name: string | number;
  className: string;
  avatar: Block<AvatarType>;
} & Props;

export default class Message extends Block<MessageType> {
  constructor(props: MessageType) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(messageTemplate, this.props);
  }
}
