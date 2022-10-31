import GeneralButton from "../../components/generalButton/generalButton";
import GeneralInput from "../../components/generalInput/generalInput";
import GeneralLink from "../../components/generalLink/generalLink";
import Input from "../../components/input/input";
import Block from "../../utils/block";
import { onSubmitForm } from "../../utils/form/form";
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
            pattern: "[\\w.-]+@([A-Za-z0-9-]+\\.)+[A-Za-z0-9]+",
          },
        }),
        label: "email",
        errorText: "Invalid Email",
      }),
      generalInputLogin: new GeneralInput({
        input: new Input({
          type: "login",
          attr: {
            name: "login",
            maxLength: 20,
            minLength: 3,
            required: true,
            pattern: "^[a-zA-Z][a-zA-Z0-9-_]{2,20}$",
          },
        }),
        label: "login",
        errorText: "Invalid login",
      }),
      generalInputName: new GeneralInput({
        input: new Input({
          type: "text",
          attr: {
            name: "first_name",
            required: true,
            pattern:
              "[A-ZА-Я]{1,}.*" + "[^0-9]" + "[^+=~!?@#$%^&*;\\.\\()\\[\\]\\|:]",
          },
        }),
        label: "name",
        errorText: "Invalid Name",
      }),
      generalInputSurname: new GeneralInput({
        input: new Input({
          type: "text",
          attr: {
            name: "second_name",
            required: true,
            pattern:
              "[A-ZА-Я]{1,}.*" + "[^0-9]" + "[^+=~!?@#$%^&*;\\.\\()\\[\\]\\|:]",
          },
        }),
        label: "surname",
        errorText: "Invalid Surname",
      }),
      generalInputPhoneNumber: new GeneralInput({
        input: new Input({
          type: "tel",
          attr: {
            name: "phone",
            maxLength: 15,
            minLength: 10,
            required: true,
            pattern: "^(\\+[0-9]|[0-9])\\s?\\(?[0-9]{3}\\)?\\s?[0-9]{7}$",
          },
        }),
        label: "phone number",
        errorText: "Invalid phone number",
      }),
      generalInputPassword: new GeneralInput({
        input: new Input({
          type: "password",
          attr: {
            name: "password",
            maxLength: 40,
            minLength: 8,
            required: true,
            pattern:
              "^^(?=.*[A-Z]{1,})" +
              "(?=.*[a-z]{1,})(?=.*[0-9]{1,})" +
              "[a-zA-Z0-9!@#$-_?.:{]{8,40}$",
          },
        }),
        label: "password",
        errorText: "Invalid password",
      }),

      generalButtonCreateAccount: new GeneralButton({
        buttonText: "Create account",
        events: {
          click: (event) => onSubmitForm.apply(this, [event]),
        },
      }),
      generalLinkEnter: new GeneralLink({
        text: "Login",
        href: "../login/login.html",
      }),
      class: ["card"],
    });
  }

  render(): DocumentFragment {
    return this.compile(registrationTemplate, this.props);
  }
}

const registration = new Registration();

render(".main", registration);
