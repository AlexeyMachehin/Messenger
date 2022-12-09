import { Block } from "../../utils/Block";
import { manageUserModalTemplate } from "./manageUserModalTemplate";
import { CommonProps } from "../../utils/models/props";
import {GeneralInput} from "../generalInput/GeneralInput";
import {GeneralButton} from "../generalButton/GeneralButton";
import { Dialog } from "../../utils/service/dialogService";
import { fromStringToClassName } from "../../utils/fromStringToClassName";

type ManageUserModalType = {
  title: string;
  generalInput: GeneralInput;
  generalButton: GeneralButton;
} & CommonProps;

export class ManageUserModal extends Block<ManageUserModalType> {
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
