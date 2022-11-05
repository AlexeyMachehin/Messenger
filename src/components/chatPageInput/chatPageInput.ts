import Block from "../../utils/block";
import { chatPageInputTemplate } from "./chatPageInputTemplate";
import { Props } from "../../utils/models/props";

type ChatPageInputType = {
  type: string;
  placeholder: string;
  name?: string;
} & Props;

export default class ChatPageInput extends Block<ChatPageInputType> {
  constructor(props: ChatPageInputType) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(chatPageInputTemplate, this.props);
  }
}
