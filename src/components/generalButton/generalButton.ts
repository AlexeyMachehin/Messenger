import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { generalButtonTemplate } from "./generalButtonTemplate";

export default class GeneralButton extends Block {
  constructor(props: Props & { buttonText: string }) {
    super("button", { ...props, class: ["general-button"] });
  }

  render(): DocumentFragment {
    return this.compile(generalButtonTemplate, this.props);
  }
}
