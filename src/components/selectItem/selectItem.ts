import Block from "../../utils/block";
import { selectItemTemplate } from "./selectItemTemplate";
import { Props } from "../../utils/models/props";

type SelectItemType = {
  text: string;
  classIcon: string;
} & Props;

export default class SelectItem extends Block<SelectItemType> {
  constructor(props: SelectItemType) {
    super("div", { ...props, class: ["select-item"] });
  }

  render(): DocumentFragment {
    return this.compile(selectItemTemplate, this.props);
  }
}
