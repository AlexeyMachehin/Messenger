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
  phone: "+7 (000) 000 00 00",
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
          },
        }),
        label: "phone number",
        errorText: "",
      }),
      generalButtonSave: new GeneralButton({
        buttonText: "Save",
        events: {
          click: (event) => onSubmitForm.apply(this, [event]),
        },
      }),
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
