import GeneralButton from "../../components/generalButton/generalButton";
import GeneralInput from "../../components/generalInput/generalInput";
import GoBackAside from "../../components/goBackAside/goBackAside";
import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { render } from "../../utils/renderDOM";
import { changePasswordTemplate } from "./changePasswordTemplate";

export default class ChangePassword extends Block {
  constructor(
    props: Props & {
      avatarURL: string;
      generalInputOldPassword: Block;
      generalInputNewPassword: Block;
      generalInputRepeatPassword: Block;
      generalButtonSave: Block;
      goBackAside: Block;
    }
  ) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(changePasswordTemplate, this.props);
  }
}
const changePassword: ChangePassword = new ChangePassword({
  avatarURL:
    "https://avatars.mds.yandex.net/i?id=90a14aacfb5159c04fc902bad5bbd095-5232129-images-thumbs&n=13&exp=1",
  generalInputOldPassword: new GeneralInput({
    label: "Old password",
    type: "password",
    name: "password",
  }),
  generalInputNewPassword: new GeneralInput({
    label: "New password",
    type: "password",
    name: "password",
  }),
  generalInputRepeatPassword: new GeneralInput({
    label: "Repeat password",
    type: "password",
    name: "password",
    errorText: "Passwords don't match",
  }),
  generalButtonSave: new GeneralButton({
    buttonText: "Save",
  }),
  goBackAside: new GoBackAside({}),
});

render(".main", changePassword);
