import Block from "../../utils/block";
import { chatTemplate } from "./chatTemplate";
import { CommonProps } from "../../utils/models/props";
import Avatar from "../avatar/avatar";

type ChatType = {
  name: string;
  message: string;
  time: string;
  count: number;
  avatar: Avatar;
  id: number;
} & CommonProps;

export default class Chat extends Block<ChatType> {
  constructor(props: ChatType) {
    super("article", props);
  }
  render(): DocumentFragment {
    return this.compile(chatTemplate, this.props);
  }
}
