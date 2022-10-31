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
export default class ChangeData extends Block {
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
          click: () => handleClick.apply(this),
        },
      }),
      generalInputEmail: new GeneralInput({
        input: new Input({
          type: "email",
          attr: {
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
          type: "login",
          attr: {
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
          type: "text",
          attr: {
            name: "first_name",
            value: user.first_name,
            required: true,
            pattern: ValidationPattern.First_name,
          },
        }),
        label: "name",
        errorText: ValidationError.First_name,
      }),
      generalInputSurname: new GeneralInput({
        input: new Input({
          type: "text",
          attr: {
            name: "second_name",
            value: user.second_name,
            required: true,
            pattern: ValidationPattern.Second_name,
          },
        }),
        label: "surname",
        errorText: ValidationError.Second_name,
      }),
      generalInputNickname: new GeneralInput({
        input: new Input({
          type: "text",
          attr: {
            name: "display_name",
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
        submit: (event) => onSubmitForm.apply(this, [event]),
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(changeDataTemplate, this.props);
  }
}

const changeData = new ChangeData();

render(".main", changeData);

function handleClick() {
  this.children.uploadAvatarModal.service.openDialog();
}
