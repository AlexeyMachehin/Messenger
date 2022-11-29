import Block from "../../utils/Block";
import { generalButtonTemplate } from "./generalButtonTemplate";
import { CommonProps } from "../../utils/models/props";

type GeneralButtonType = {
  buttonText: string;
} & CommonProps;

export class GeneralButton extends Block<GeneralButtonType> {
  constructor(props: GeneralButtonType) {
    super("button", { ...props, class: ["general-button"] });
  }

  render(): DocumentFragment {
    return this.compile(generalButtonTemplate, this.props);
  }
}
