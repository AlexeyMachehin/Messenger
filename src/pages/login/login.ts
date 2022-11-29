import  UserController  from './../../controllers/user-controllers';
import Block from "../../utils/block";
import { loginTemplate } from "./loginTemplate";
import { CommonProps } from "./../../utils/models/props";
import GeneralButton from "../../components/generalButton/generalButton";
import GeneralInput from "../../components/generalInput/generalInput";
import GeneralLink from "../../components/generalLink/generalLink";
import Input from "../../components/input/input";
import { router } from "../../index";
import {
  ValidationPattern,
  ValidationError,
} from "./../../utils/models/validation";
import { onSubmitForm } from "../../utils/form/form";
import { ROUTES } from "../../utils/router/routes";
import "./login.scss";

type LoginType = {
  generalInputLogin: GeneralInput;
  generalInputPassword: GeneralInput;
  generalButtonEnter: GeneralButton;
  generalLinkCreateAccount: GeneralLink;
} & CommonProps;

const userController = new UserController();

export default class Login extends Block<LoginType> {
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
          attr: {
            type: "password",
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
        events: {
          click: () => {
            router.go(ROUTES.SignUp);
          },
        },
      }),
      events: {
        submit: (event) => {
          const inputValues = onSubmitForm.apply<
            Login,
            [Event, string],
            { login: string; password: string }
          >(this, [event, ".login-form"]);
          userController.signIn(inputValues).then((result) => {
            if (result) {
              router.go(ROUTES.Chats);
            }
          });
        },
      },
      class: ["card"],
    });
  }

  render(): DocumentFragment {
    return this.compile(loginTemplate, this.props);
  }
}
