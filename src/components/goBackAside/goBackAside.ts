import Block from "../../utils/block";
import { goBackAsideTemplate } from "./goBackAsideTemplate";
import { Props } from "../../utils/models/props";

export default class GoBackAside extends Block<Props> {
  constructor(props?: Props) {
    super("div", { ...props, class: ["goBackAside"] });
  }

  render(): DocumentFragment {
    return this.compile(goBackAsideTemplate, this.props);
  }
}
