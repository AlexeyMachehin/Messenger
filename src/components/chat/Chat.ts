import Block from "../../utils/Block";
import { chatTemplate } from "./chatTemplate";
import { CommonProps } from "../../utils/models/props";
import {Avatar} from "../avatar/Avatar";

type ChatType = {
  name: string;
  message: string;
  time: string;
  count: number;
  avatar: Avatar;
  id: number;
} & CommonProps;

export class Chat extends Block<ChatType> {
  constructor(props: ChatType) {
    super("article", props);
  }
  render(): DocumentFragment {
    return this.compile(chatTemplate, this.props);
  }
}
