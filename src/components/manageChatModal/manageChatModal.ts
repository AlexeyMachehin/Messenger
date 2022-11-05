import Block from "../../utils/block";
import { manageChatModalTemplate } from "./manageChatModalTemplate";
import { Props } from "../../utils/models/props";
import { Dialog } from "../../utils/service/dialogService";
import { fromStringToClassName } from "../../utils/fromStringToClassName";
import GeneralButton from "../generalButton/generalButton";

type ManageChatModalType = {
  generalButton: GeneralButton;
  title: string;
} & Props;

export default class ManageChatModal extends Block<ManageChatModalType> {
  service: Dialog;
  constructor(props: ManageChatModalType) {
    super("dialog", props);
  }

  componentDidMount(): void {
    if (this.props.class != null) {
      this.service = new Dialog(fromStringToClassName(this.props.class));
    }
  }

  render(): DocumentFragment {
    return this.compile(manageChatModalTemplate, this.props);
  }
}
