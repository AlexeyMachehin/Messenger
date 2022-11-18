import connection from "./../../utils/WebSocket";
import Block from "../../utils/block";
import { loginTemplate } from "./loginTemplate";
import { Props } from "./../../utils/models/props";
import {
  ValidationPattern,
  ValidationError,
} from "./../../utils/models/validation";
import { onSubmitForm } from "../../utils/form/form";
import GeneralButton from "../../components/generalButton/generalButton";
import GeneralInput from "../../components/generalInput/generalInput";
import GeneralLink from "../../components/generalLink/generalLink";
import Input from "../../components/input/input";
import "./login.scss";
import { router } from "../../index";
import userController from "../../controllers/user-controllers";
import { store, StoreEvents } from "../../store/Store";
// import chatsController from "../../controllers/chats-controller";

type LoginType = {
  generalInputLogin: GeneralInput;
  generalInputPassword: GeneralInput;
  generalButtonEnter: GeneralButton;
  generalLinkCreateAccount: GeneralLink;
} & Props;

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
        // href: "../registration/registration",
        events: {
          click: () => {
            router.go("/sign-up");
          },
        },
      }),
      events: {
        submit: (event) => {
          const inputValues = onSubmitForm.apply<
            Login,
            [Event],
            { login: string; password: string }
          >(this, [event]);
          userController.signIn(inputValues);
          // chatsController.getChats();
        },
      },
      class: ["card"],
      first_name: "Test",
    });
    
    store.on(StoreEvents.Updated, (state) => {
      this.setProps(state);
    });
    
    connection.connect();
    userController.getUser();
  }

  render(): DocumentFragment {
    return this.compile(loginTemplate, this.props);
  }
}

// const login = new Login();

// render(".main", login);
