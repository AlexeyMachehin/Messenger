import Avatar from "../../components/avatar/avatar";
import { Dialog } from "../../components/dialogModal/dialogService";
import GeneralButton from "../../components/generalButton/generalButton";
import GeneralInput from "../../components/generalInput/generalInput";
import GoBackAside from "../../components/goBackAside/goBackAside";
import UploadAvatarModal from "../../components/uploadAvatarModal/uploadAvatarModal";
import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { render } from "../../utils/renderDOM";
import { changeDataTemplate } from "./changeDataTemplate";

// const dialog = new Dialog(".uploadAvatarModal");
// const openBtn = document.querySelector("#open");

// openBtn?.addEventListener("click", () => dialog.openDialog());

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
let dialog: Dialog;
export default class ChangeData extends Block {
  constructor(
    props: Props & {
      uploadAvatarModal: Block;
      avatarURL: string;
      displayName: string;
      avatar: Avatar;
      goBackAside: Block;
      generalInputEmail: Block;
      generalInputLogin: Block;
      generalInputName: Block;
      generalInputSurname: Block;
      generalInputNickname: Block;
      generalInputPhoneNumber: Block;
      generalButtonSave: Block;
    }
  ) {
    super("div", props);
  }

  componentDidMount(): void {
    dialog = new Dialog(".uploadAvatarModal");
  }

  render(): DocumentFragment {
    return this.compile(changeDataTemplate, this.props);
  }
}

const changeData: ChangeData = new ChangeData({
  avatarURL: user.avatarURL,
  displayName: user.display_name,
  goBackAside: new GoBackAside(),

  uploadAvatarModal: new UploadAvatarModal({
    avatarURL: user.avatarURL,
  }),
  avatar: new Avatar({
    avatarURL:
      "https://avatars.mds.yandex.net/i?id=90a14aacfb5159c04fc902bad5bbd095-5232129-images-thumbs&n=13&exp=1",
    class: "avatar-wrapper",
    classImg: "avatar",
    events: {
      click: () => dialog.openDialog(),
    },
  }),
  generalInputEmail: new GeneralInput({
    label: "email",
    type: "email",
    name: "email",
    errorText: "",
    disabled: false,
    value: user.email,
  }),
  generalInputLogin: new GeneralInput({
    label: "login",
    type: "login",
    name: "login",
    errorText: "",
    disabled: false,
    value: user.login,
  }),
  generalInputName: new GeneralInput({
    label: "name",
    type: "text",
    name: "name",
    errorText: "",
    disabled: false,
    value: user.first_name,
  }),
  generalInputSurname: new GeneralInput({
    label: "surname",
    type: "text",
    name: "second_name",
    errorText: "",
    disabled: false,
    value: user.second_name,
  }),
  generalInputNickname: new GeneralInput({
    label: "nickname",
    type: "text",
    name: "display_name",
    errorText: "",
    disabled: false,
    value: user.display_name,
  }),
  generalInputPhoneNumber: new GeneralInput({
    label: "phone number",
    type: "tel",
    name: "phone",
    errorText: "",
    disabled: false,
    value: user.phone,
  }),
  generalButtonSave: new GeneralButton({
    buttonText: "Save",
  }),
});

render(".main", changeData);
