import Block from "../../utils/block";
import { uploadAvatarModalTemplate } from "./uploadAvatarModalTemplate";
import { Dialog } from "../../utils/service/dialogService";
import { Props } from "../../utils/models/props";

type UploadAvatarModalType = {
  avatarURL: string;
} & Props;

export default class UploadAvatarModal extends Block<UploadAvatarModalType> {
  service: Dialog | null = null;
  constructor(props: UploadAvatarModalType) {
    super("dialog", { ...props, class: ["uploadAvatarModal"] });
  }

  componentDidMount(): void {
    this.service = new Dialog(".uploadAvatarModal");
  }

  render(): DocumentFragment {
    return this.compile(uploadAvatarModalTemplate, this.props);
  }
}
