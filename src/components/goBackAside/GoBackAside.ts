import { Block } from "../../utils/Block";
import { goBackAsideTemplate } from "./goBackAsideTemplate";
import { CommonProps } from "../../utils/models/props";

export class GoBackAside extends Block<CommonProps> {
  constructor(props?: CommonProps) {
    super("div", { ...props, class: ["goBackAside"] });
  }

  render(): DocumentFragment {
    return this.compile(goBackAsideTemplate, this.props);
  }
}
