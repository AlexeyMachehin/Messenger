import Block from "../../utils/block";
import { checkInputValue } from "../../utils/form/form";
import { Props } from "../../utils/models/props";
import Input from "../input/input";
import { generalInputTemplate } from "./generalInputTemplate";

export default class GeneralInput extends Block {
  constructor(
    props: Props & {
      label: string;
      input: Input;
      errorText?: string;
      isValid?: boolean;
    }
  ) {
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
