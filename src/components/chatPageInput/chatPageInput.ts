import Block from "../../utils/block";
import { chatPageInputTemplate } from "./chatPageInputTemplate";
import { Props } from "../../utils/models/props";

type ChatPageInputType = {
  type: string;
  placeholder: string;
  name?: string;
  change?: (event: Event) => void;
} & Props;

export default class ChatPageInput extends Block<ChatPageInputType> {
  constructor(props: ChatPageInputType) {
    super("div", props);
  }

  componentDidMount(): void {
    const change = this.props.change;
    if (change) {
      const input = this.element?.querySelector("input");
      input?.addEventListener("input", (event) => change(event));
    }
  }

  render(): DocumentFragment {
    return this.compile(chatPageInputTemplate, this.props);
  }
}
