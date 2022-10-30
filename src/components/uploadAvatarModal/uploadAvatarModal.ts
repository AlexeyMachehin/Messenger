import { Dialog } from './../dialogModal/dialogService';
import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { uploadAvatarModalTemplate } from "./uploadAvatarModalTemplate";

export default class UploadAvatarModal extends Block {
  service: Dialog;
  constructor(props: Props & { avatarURL: string }) {
    super("dialog", { ...props, class: ["uploadAvatarModal"] });
  }

  componentDidMount(): void {
    this.service = new Dialog('.uploadAvatarModal')
  }

  render(): DocumentFragment {
    return this.compile(uploadAvatarModalTemplate, this.props);
  }
}
