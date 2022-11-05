import Block from "../../utils/block";
import { generalButtonTemplate } from "./generalButtonTemplate";
import { Props } from "../../utils/models/props";

type GeneralButtonType = {
  buttonText: string;
} & Props;

export default class GeneralButton extends Block<GeneralButtonType> {
  constructor(props: GeneralButtonType) {
    super("button", { ...props, class: ["general-button"] });
  }

  render(): DocumentFragment {
    return this.compile(generalButtonTemplate, this.props);
  }
}
