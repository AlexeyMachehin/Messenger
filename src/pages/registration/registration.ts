import GeneralButton from "../../components/generalButton/generalButton";
import GeneralInput from "../../components/generalInput/generalInput";
import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { render } from "../../utils/renderDOM";
import { registrationTemplate } from "./registrationTemplate";

export default class Registration extends Block {
  constructor(
    props: Props & {
      generalInputEmail: Block;
      generalInputLogin: Block;
      generalInputName: Block;
      generalInputSurname: Block;
      generalInputPhoneNumber: Block;
      generalInputPassword: Block;
      generalInputRepeatPassword: Block;
      generalButtonCreateAccount: Block;
      generalButtonEnter: Block;
    }
  ) {
    super("div", { ...props, class: "card" });
  }

  render(): DocumentFragment {
    return this.compile(registrationTemplate, this.props);
  }
}

const registration: Registration = new Registration({
  generalInputEmail: new GeneralInput({
    label: "email",
    type: "email",
    name: "email",
    errorText: "",
  }),
  generalInputLogin: new GeneralInput({
    label: "login",
    type: "login",
    name: "login",
    errorText: "",
  }),
  generalInputName: new GeneralInput({
    label: "name",
    type: "text",
    name: "first_name",
    errorText: "",
  }),
  generalInputSurname: new GeneralInput({
    label: "surname",
    type: "text",
    name: "second_name",
    errorText: "",
  }),
  generalInputPhoneNumber: new GeneralInput({
    label: "phone number",
    type: "tel",
    name: "phone",
    errorText: "",
  }),
  generalInputPassword: new GeneralInput({
    label: "password",
    type: "password",
    name: "password",
    errorText: "",
  }),
  generalInputRepeatPassword: new GeneralInput({
    label: "password",
    type: "password",
    name: "password",
    errorText: "Passwords don't match",
  }),
  generalButtonCreateAccount: new GeneralButton({
    buttonText: "Create account",
  }),
  generalButtonEnter: new GeneralButton({
    buttonText: "Create account",
  }),
});

render(".main", registration);
