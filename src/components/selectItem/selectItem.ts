import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { selectItemTemplate } from "./selectItemTemplate";

export default class SelectItem extends Block {
  constructor(props: Props & { text: string; classIcon: string }) {
    super("div", { ...props, class: ["select-item"] });
  }

  render(): DocumentFragment {
    return this.compile(selectItemTemplate, this.props);
  }
}
