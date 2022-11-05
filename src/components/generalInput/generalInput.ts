import Block from "../../utils/block";
import { generalInputTemplate } from "./generalInputTemplate";
import { Props } from "../../utils/models/props";
import Input from "../input/input";
import { checkInputValue } from "../../utils/form/form";

type GeneralInputType = {
  label: string;
  input: Input;
  errorText?: string;
  isValid?: boolean;
} & Props;

export default class GeneralInput extends Block<GeneralInputType> {
  constructor(props: GeneralInputType) {
    super("div", {
      ...props,
      events: {
        input: (e: Event) =>
          checkInputValue.apply(this, [e.target as HTMLInputElement, e]),
        focus: (e: Event) =>
          checkInputValue.apply(this, [e.target as HTMLInputElement, e]),
        blur: (e: Event) =>
          checkInputValue.apply(this, [e.target as HTMLInputElement, e]),
      },
      isValid: true,
      class: ["general-input-wrapper"],
    });
  }

  render(): DocumentFragment {
    return this.compile(generalInputTemplate, this.props);
  }
}
