import Block from "../../utils/block";
import { manageUserModalTemplate } from "./manageUserModalTemplate";
import { CommonProps } from "../../utils/models/props";
import GeneralInput from "../generalInput/generalInput";
import GeneralButton from "../generalButton/generalButton";
import { Dialog } from "../../utils/service/dialogService";
import { fromStringToClassName } from "../../utils/fromStringToClassName";

type ManageUserModalType = {
  title: string;
  generalInput: GeneralInput;
  generalButton: GeneralButton;
} & CommonProps;

export default class ManageUserModal extends Block<ManageUserModalType> {
  service: Dialog | null = null;
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
