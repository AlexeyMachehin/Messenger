import { router } from "./../../index";
import { UserController } from "../../controllers/User";
import { Block } from "../../utils/Block";
import { profileTemplate } from "./profileTemplate";
import { GeneralInput } from "../../components/generalInput/GeneralInput";
import { GeneralLink } from "../../components/generalLink/GeneralLink";
import { GoBackAside } from "../../components/goBackAside/GoBackAside";
import { Input } from "../../components/input/Input";
import { CommonProps } from "../../utils/models/props";
import { ROUTES } from "../../utils/router/routes";
// import "./profile.scss";
import { getUserInfo } from "../../utils/getUserInfo";
import { getUserResources } from "../../utils/getUserResources";
import { DEFAULT_AVATAR_URL } from "../../utils/constants";

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
  logout: GeneralLink;
} & CommonProps;

const userController = new UserController();


export class Profile extends Block<ProfileType> {
  constructor() {
    super("div", {
      avatarURL: getUserResources("avatar") ?? DEFAULT_AVATAR_URL,
      displayName: getUserInfo("first_name"),
      goBackAside: new GoBackAside({
        events: {
          click: () => router.back(),
        },
      }),

      generalInputEmail: new GeneralInput({
        input: new Input({
          attr: {
            type: "email",
            name: "email",
            disabled: true,
            value: getUserInfo("email"),
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
            value: getUserInfo("login"),
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
            value: getUserInfo("first_name"),
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
            value: getUserInfo("second_name"),
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
            value: getUserInfo("display_name"),
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
            value: getUserInfo("phone"),
          },
        }),
        label: "phone number",
        errorText: "",
      }),
      generalLinkChangeData: new GeneralLink({
        text: "Change Data",
        events: {
          click: () => router.go(ROUTES.ChangeData),
        },
      }),
      generalLinkChangePassword: new GeneralLink({
        text: "Change password",
        events: {
          click: () => router.go(ROUTES.ChangePassword),
        },
      }),
      logout: new GeneralLink({
        text: "Exit",
        events: {
          click: () => {
            userController.logout().then(() => router.go(ROUTES.Login));
          },
        },
      }),
    });
  }

  render(): DocumentFragment {
    return this.compile(profileTemplate, this.props);
  }
}
