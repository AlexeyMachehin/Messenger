import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { chatTemplate } from "./chatTemplate";

export default class Chat extends Block {
  constructor(props: Props & {
    name: string;
    message: string;
    time: string;
    count: number;
    avatar: Block
  }) {
    super("article", props);
  }
  render(): DocumentFragment {
    return this.compile(chatTemplate, this.props);
  }
}
