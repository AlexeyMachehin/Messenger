import Block from "../../utils/block";
import { manageUserModalTemplate } from "./manageUserModalTemplate";
import { Props } from "../../utils/models/props";
import { Dialog } from "../../utils/service/dialogService";
import { fromStringToClassName } from "../../utils/fromStringToClassName";
import GeneralInput from "../generalInput/generalInput";
import GeneralButton from "../generalButton/generalButton";

type ManageUserModalType = {
  title: string;
  generalInput: GeneralInput;
  generalButton: GeneralButton;
} & Props;

export default class ManageUserModal extends Block<ManageUserModalType> {
  service: Dialog;
  constructor(props: ManageUserModalType) {
    super("dialog", { ...props, class: [...(props.class ?? []), "dialog"] });
  }

  componentDidMount(): void {
    if (this.props.class != null) {
      this.service = new Dialog(fromStringToClassName(this.props.class));
    }
  }

  render(): DocumentFragment {
    return this.compile(manageUserModalTemplate, this.props);
  }
}
