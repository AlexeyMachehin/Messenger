import {
  ValidationPattern,
  ValidationError,
} from "./../../utils/models/validation";
import Avatar from "../../components/avatar/avatar";
import GeneralButton from "../../components/generalButton/generalButton";
import GeneralInput from "../../components/generalInput/generalInput";
import GoBackAside from "../../components/goBackAside/goBackAside";
import Input from "../../components/input/input";
import UploadAvatarModal from "../../components/uploadAvatarModal/uploadAvatarModal";
import Block from "../../utils/block";
import { onSubmitForm } from "../../utils/form/form";
import { render } from "../../utils/renderDOM";
import { changeDataTemplate } from "./changeDataTemplate";
import { user } from "../../utils/mockData";
import { Props } from "../../utils/models/props";

type ChangeDataType = {
  avatarURL: string;
  displayName: string;
  goBackAside: GoBackAside;
  uploadAvatarModal: UploadAvatarModal;
  avatar: Avatar;
  generalInputEmail: GeneralInput;
  generalInputLogin: GeneralInput;
  generalInputName: GeneralInput;
  generalInputSurname: GeneralInput;
  generalInputNickname: GeneralInput;
  generalInputPhoneNumber: GeneralInput;
  generalButtonSave: GeneralButton;
} & Props;

export default class ChangeData extends Block<ChangeDataType> {
  constructor() {
    super("div", {
      avatarURL: user.avatarURL,
      displayName: user.display_name,
      goBackAside: new GoBackAside(),
      uploadAvatarModal: new UploadAvatarModal({
        avatarURL: user.avatarURL,
      }),
      avatar: new Avatar({
        avatarURL:
          "https://avatars.mds.yandex.net/i?id=90a14aacfb5159c04fc902bad5bbd095-5232129-images-thumbs&n=13&exp=1",
        class: ["avatar-wrapper"],
        classImg: "avatar",
        events: {
          click: () => handleClick.apply<ChangeData, void>(this),
        },
      }),
      generalInputEmail: new GeneralInput({
        input: new Input({
          attr: {
            type: "email",
            name: "email",
            value: user.email,
            required: true,
            pattern: ValidationPattern.Email,
          },
        }),
        label: "email",
        errorText: ValidationError.Email,
      }),
      generalInputLogin: new GeneralInput({
        input: new Input({
          attr: {
            type: "login",
            name: "login",
            value: user.login,
            required: true,
            pattern: ValidationPattern.Login,
          },
        }),
        label: "login",
        errorText: ValidationError.Login,
      }),
      generalInputName: new GeneralInput({
        input: new Input({
          attr: {
            type: "text",
            name: "first_name",
            value: user.first_name,
            required: true,
            pattern: ValidationPattern.FirstName,
          },
        }),
        label: "name",
        errorText: ValidationError.FirstName,
      }),
      generalInputSurname: new GeneralInput({
        input: new Input({
          attr: {
            type: "text",
            name: "second_name",
            value: user.second_name,
            required: true,
            pattern: ValidationPattern.SecondName,
          },
        }),
        label: "surname",
        errorText: ValidationError.SecondName,
      }),
      generalInputNickname: new GeneralInput({
        input: new Input({
          attr: {
            type: "text",
            name: "display_name",
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
            value: user.phone,
            required: true,
            pattern: ValidationPattern.Phone,
          },
        }),
        label: "phone number",
        errorText: ValidationError.Phone,
      }),
      generalButtonSave: new GeneralButton({
        buttonText: "Save",
      }),
      events: {
        submit: (event) => onSubmitForm.apply<ChangeData, [Event], void>(this, [event]),
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(changeDataTemplate, this.props);
  }
}

const changeData = new ChangeData();

render(".main", changeData);

function handleClick(this: ChangeData) {
  (this.children.uploadAvatarModal as UploadAvatarModal).service?.openDialog();
}
