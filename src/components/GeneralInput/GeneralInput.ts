import Block from "../../utils/Block";
import { generalInputTemplate } from "./generalInputTemplate";
import { CommonProps } from "../../utils/models/props";
import {Input} from "../Input/Input";
import { checkInputValue } from "../../utils/form/form";

type GeneralInputType = {
  label: string;
  input: Input;
  errorText?: string;
  isValid?: boolean;
} & CommonProps;

export class GeneralInput extends Block<GeneralInputType> {
  constructor(props: GeneralInputType) {
    super("div", {
      ...props,
      events: {
        input: (e: Event) =>
          checkInputValue.apply<GeneralInput, [HTMLInputElement, Event], void>(
            this,
            [e.target as HTMLInputElement, e]
          ),
        focus: (e: Event) =>
          checkInputValue.apply<GeneralInput, [HTMLInputElement, Event], void>(
            this,
            [e.target as HTMLInputElement, e]
          ),
        blur: (e: Event) =>
          checkInputValue.apply<GeneralInput, [HTMLInputElement, Event], void>(
            this,
            [e.target as HTMLInputElement, e]
          ),
      },
      isValid: true,
      class: ["general-input-wrapper"],
    });
  }

  render(): DocumentFragment {
    return this.compile(generalInputTemplate, this.props);
  }
}
