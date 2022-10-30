import GeneralInput from "../../components/generalInput/generalInput";
import GeneralLink from "../../components/generalLink/generalLink";
import GoBackAside from "../../components/goBackAside/goBackAside";
import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { render } from "../../utils/renderDOM";
import { profileTemplate } from "./profileTemplate";

export const user = {
  email: "Bart@yandex.ru",
  login: "Bart",
  first_name: "Bart",
  second_name: "Simpson",
  display_name: "BartSimpson",
  phone: "+7 (000) 000 00 00",
  avatarURL:
    "https://avatars.mds.yandex.net/i?id=90a14aacfb5159c04fc902bad5bbd095-5232129-images-thumbs&n=13&exp=1",
};

export default class Profile extends Block {
  constructor(
    props: Props & {
      avatarURL: string;
      displayName: string;
      goBackAside: Block;
      generalInputEmail: Block;
      generalInputLogin: Block;
      generalInputName: Block;
      generalInputSurname: Block;
      generalInputNickname: Block;
      generalInputPhoneNumber: Block;
      generalLinkChangeData: Block;
      generalLinkChangePassword: Block;
    }
  ) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(profileTemplate, this.props);
  }
}
const profile: Profile = new Profile({
  avatarURL: user.avatarURL,
  displayName: user.display_name,
  goBackAside: new GoBackAside(),

  generalInputEmail: new GeneralInput({
    label: "email",
    type: "email",
    name: "email",
    errorText: "",
    disabled: true,
    value: user.email,
  }),
  generalInputLogin: new GeneralInput({
    label: "login",
    type: "login",
    name: "login",
    errorText: "",
    disabled: true,
    value: user.login,
  }),
  generalInputName: new GeneralInput({
    label: "name",
    type: "text",
    name: "name",
    errorText: "",
    disabled: true,
    value: user.first_name,
  }),
  generalInputSurname: new GeneralInput({
    label: "surname",
    type: "text",
    name: "second_name",
    errorText: "",
    disabled: true,
    value: user.second_name,
  }),
  generalInputNickname: new GeneralInput({
    label: "nickname",
    type: "text",
    name: "display_name",
    errorText: "",
    disabled: true,
    value: user.display_name,
  }),
  generalInputPhoneNumber: new GeneralInput({
    label: "phone number",
    type: "tel",
    name: "phone",
    errorText: "",
    disabled: true,
    value: user.phone,
  }),
  generalLinkChangeData: new GeneralLink({
    text: "Change Data",
    href: "../../pages/changeData/changeData.html",
  }),
  generalLinkChangePassword: new GeneralLink({
    text: "Change password",
    href: "../../pages/changePassword/changePassword.html",
  }),
});

render(".main", profile);
