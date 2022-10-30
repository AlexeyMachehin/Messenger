import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { goBackAsideTemplate } from "./goBackAsideTemplate";

export default class GoBackAside extends Block {
  constructor(props?: Props) {
    super("div", { ...props, class: "goBackAside" });
  }

  render(): DocumentFragment {
    return this.compile(goBackAsideTemplate, this.props);
  }
}
