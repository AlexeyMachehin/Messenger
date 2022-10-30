import GeneralButton from "../../components/generalButton/generalButton";
import GeneralInput from "../../components/generalInput/generalInput";
import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { render } from "../../utils/renderDOM";
import { loginTemplate } from "./loginTemplate";

export default class Login extends Block {
  constructor(
    props: Props & {
      generalInputLogin: Block;
      generalInputPassword: Block;
      generalButtonEnter: Block;
      generalButtonCreateAccount: Block;
    }
  ) {
    super("div", { ...props, class: "card" });
  }

  render(): DocumentFragment {
    return this.compile(loginTemplate, this.props);
  }
}

const login: Login = new Login({
  generalInputLogin: new GeneralInput({
    label: "login",
    type: "login",
    name: "login",
    errorText: "",
  }),
  generalInputPassword: new GeneralInput({
    label: "password",
    type: "password",
    name: "password",
    errorText: "Invalid login or password",
  }),
  generalButtonEnter: new GeneralButton({
    buttonText: "Enter",
  }),
  generalButtonCreateAccount: new GeneralButton({
    buttonText: "Create account",
  }),
});

render(".main", login);
