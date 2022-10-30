import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { chatPageInputTemplate } from "./chatPageInputTemplate";

export default class ChatPageInput extends Block {
  constructor(
    props: Props & {
      type: string;
      placeholder: string;
      name?: string;
    }
  ) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(chatPageInputTemplate, this.props);
  }
}
