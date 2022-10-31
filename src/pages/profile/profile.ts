import GeneralInput from "../../components/generalInput/generalInput";
import GeneralLink from "../../components/generalLink/generalLink";
import GoBackAside from "../../components/goBackAside/goBackAside";
import Input from "../../components/input/input";
import Block from "../../utils/block";
import { render } from "../../utils/renderDOM";
import { profileTemplate } from "./profileTemplate";

const user = {
  email: "Bart@yandex.ru",
  login: "Bart",
  first_name: "Bart",
  second_name: "Simpson",
  display_name: "BartSimpson",
  phone: "+70000000000",
  avatarURL:
    "https://avatars.mds.yandex.net/i?id=90a14aacfb5159c04fc902bad5bbd095-5232129-images-thumbs&n=13&exp=1",
};

export default class Profile extends Block {
  constructor() {
    super("div", {
      avatarURL: user.avatarURL,
      displayName: user.display_name,
      goBackAside: new GoBackAside(),

      generalInputEmail: new GeneralInput({
        input: new Input({
          type: "email",
          attr: {
            name: "email",
            disabled: true,
            value: user.email,
          },
        }),
        label: "email",
        errorText: "",
      }),
      generalInputLogin: new GeneralInput({
        input: new Input({
          type: "login",
          attr: {
            name: "login",
            disabled: true,
            value: user.login,
          },
        }),
        label: "login",
        errorText: "",
      }),
      generalInputName: new GeneralInput({
        input: new Input({
          type: "text",
          attr: {
            name: "name",
            disabled: true,
            value: user.first_name,
          },
        }),
        label: "name",
        errorText: "",
      }),
      generalInputSurname: new GeneralInput({
        input: new Input({
          type: "text",
          attr: {
            name: "second_name",
            disabled: true,
            value: user.second_name,
          },
        }),
        label: "surname",
        errorText: "",
      }),
      generalInputNickname: new GeneralInput({
        input: new Input({
          type: "text",
          attr: {
            name: "display_name",
            disabled: true,
            value: user.display_name,
          },
        }),
        label: "nickname",
        errorText: "",
      }),
      generalInputPhoneNumber: new GeneralInput({
        input: new Input({
          type: "tel",
          attr: {
            name: "phone",
            disabled: true,
            value: user.phone,
          },
        }),
        label: "phone number",
        errorText: "",
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
  }

  render(): DocumentFragment {
    return this.compile(profileTemplate, this.props);
  }
}
const profile = new Profile();

render(".main", profile);
