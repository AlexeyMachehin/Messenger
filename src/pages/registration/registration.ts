import { ValidationPattern } from "./../../utils/models/validation";
import GeneralButton from "../../components/generalButton/generalButton";
import GeneralInput from "../../components/generalInput/generalInput";
import GeneralLink from "../../components/generalLink/generalLink";
import Input from "../../components/input/input";
import Block from "../../utils/block";
import { onSubmitForm } from "../../utils/form/form";
import { ValidationError } from "../../utils/models/validation";
import { render } from "../../utils/renderDOM";
import { registrationTemplate } from "./registrationTemplate";

export default class Registration extends Block {
  constructor() {
    super("div", {
      generalInputEmail: new GeneralInput({
        input: new Input({
          type: "email",
          attr: {
            name: "email",
            required: true,
            pattern: ValidationPattern.Email,
          },
        }),
        label: "email",
        errorText: ValidationError.Email,
      }),
      generalInputLogin: new GeneralInput({
        input: new Input({
          type: "login",
          attr: {
            name: "login",
            maxLength: 20,
            minLength: 3,
            required: true,
            pattern: ValidationPattern.Login,
          },
        }),
        label: "login",
        errorText: ValidationError.Login,
      }),
      generalInputName: new GeneralInput({
        input: new Input({
          type: "text",
          attr: {
            name: "first_name",
            required: true,
            pattern: ValidationPattern.First_name,
          },
        }),
        label: "name",
        errorText: ValidationError.First_name,
      }),
      generalInputSurname: new GeneralInput({
        input: new Input({
          type: "text",
          attr: {
            name: "second_name",
            required: true,
            pattern: ValidationPattern.Second_name,
          },
        }),
        label: "surname",
        errorText: ValidationError.Second_name,
      }),
      generalInputPhoneNumber: new GeneralInput({
        input: new Input({
          type: "tel",
          attr: {
            name: "phone",
            maxLength: 15,
            minLength: 10,
            required: true,
            pattern: ValidationPattern.Phone,
          },
        }),
        label: "phone number",
        errorText: ValidationError.Phone,
      }),
      generalInputPassword: new GeneralInput({
        input: new Input({
          type: "password",
          attr: {
            name: "password",
            maxLength: 40,
            minLength: 8,
            required: true,
            pattern: ValidationPattern.Password,
          },
        }),
        label: "password",
        errorText: ValidationError.Password,
      }),
      generalButtonCreateAccount: new GeneralButton({
        buttonText: "Create account",
      }),
      generalLinkEnter: new GeneralLink({
        text: "Login",
        href: "../login/login.html",
      }),
      events: {
        submit: (event) => onSubmitForm.apply(this, [event]),
      },
      class: ["card"],
    });
  }

  render(): DocumentFragment {
    return this.compile(registrationTemplate, this.props);
  }
}

const registration = new Registration();

render(".main", registration);
