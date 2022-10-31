import {
  ValidationPattern,
  ValidationError,
} from "./../../utils/models/validation";
import GeneralButton from "../../components/generalButton/generalButton";
import GeneralInput from "../../components/generalInput/generalInput";
import GeneralLink from "../../components/generalLink/generalLink";
import Input from "../../components/input/input";
import Block from "../../utils/block";
import { onSubmitForm } from "../../utils/form/form";
import { render } from "../../utils/renderDOM";
import { loginTemplate } from "./loginTemplate";

export default class Login extends Block {
  constructor() {
    super("div", {
      generalInputLogin: new GeneralInput({
        label: "login",
        input: new Input({
          attr: {
            type: "login",
            name: "login",
            required: true,
            pattern: ValidationPattern.Login,
          },
        }),
        errorText: ValidationError.Login,
      }),
      generalInputPassword: new GeneralInput({
        input: new Input({
          type: "password",
          attr: {
            name: "password",
            required: true,
            pattern: ValidationPattern.Password,
          },
        }),
        label: "password",
        errorText: ValidationError.Password,
      }),
      generalButtonEnter: new GeneralButton({
        buttonText: "Enter",
      }),
      generalLinkCreateAccount: new GeneralLink({
        text: "Create account",
        href: "../registration/registration.html",
      }),
      events: {
        submit: (event) => onSubmitForm.apply(this, [event]),
      },
      class: ["card"],
    });
  }

  render(): DocumentFragment {
    return this.compile(loginTemplate, this.props);
  }
}

const login = new Login();

render(".main", login);