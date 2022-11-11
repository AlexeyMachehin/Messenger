import Block from "../../utils/block";
import { profileTemplate } from "./profileTemplate";
import { Props } from "./../../utils/models/props";
// import { render } from "../../utils/renderDOM";
import { user } from "../../utils/mockData";
import GeneralInput from "../../components/generalInput/generalInput";
import GeneralLink from "../../components/generalLink/generalLink";
import GoBackAside from "../../components/goBackAside/goBackAside";
import Input from "../../components/input/input";
import "./profile.scss";
import { router } from '../../index';

type ProfileType = {
  avatarURL: string;
  displayName: string;
  goBackAside: GoBackAside;
  generalInputEmail: GeneralInput;
  generalInputLogin: GeneralInput;
  generalInputName: GeneralInput;
  generalInputSurname: GeneralInput;
  generalInputNickname: GeneralInput;
  generalInputPhoneNumber: GeneralInput;
  generalLinkChangeData: GeneralLink;
  generalLinkChangePassword: GeneralLink;
} & Props;

export default class Profile extends Block<ProfileType> {
  constructor() {
    super("div", {
      avatarURL: user.avatarURL,
      displayName: user.display_name,
      goBackAside: new GoBackAside({
        events: {
          click: () => router.back()
        },
      }),

      generalInputEmail: new GeneralInput({
        input: new Input({
          attr: {
            type: "email",
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
          attr: {
            type: "login",
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
          attr: {
            type: "text",
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
          attr: {
            type: "text",
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
          attr: {
            type: "text",
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
          attr: {
            type: "tel",
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
        events: {
          click: () => router.go("/change-data")
        },
      }),
      generalLinkChangePassword: new GeneralLink({
        text: "Change password",
        events: {
          click: () => router.go("/change-password")
        },
      }),
    });
  }

  render(): DocumentFragment {
    return this.compile(profileTemplate, this.props);
  }
}
// const profile = new Profile();

// render(".main", profile);
