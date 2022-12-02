import { Block } from "../../utils/Block";
import { manageChatModalTemplate } from "./manageChatModalTemplate";
import { CommonProps } from "../../utils/models/props";
import { Dialog } from "../../utils/service/dialogService";
import { fromStringToClassName } from "../../utils/fromStringToClassName";
import { GeneralButton } from "../generalButton/GeneralButton";

type ManageChatModalType = {
  generalButton: GeneralButton;
  title: string;
  handleOnSubmit: () => void;
} & CommonProps;

export class ManageChatModal extends Block<ManageChatModalType> {
  service: Dialog | null = null;
  constructor(props: ManageChatModalType) {
    super("dialog", props);
  }

  componentDidMount(): void {
    if (this.props.class != null) {
      this.service = new Dialog(fromStringToClassName(this.props.class));
      this._subscribeToClickOnSubmit(fromStringToClassName(this.props.class));
    }
  }

  render(): DocumentFragment {
    return this.compile(manageChatModalTemplate, this.props);
  }

  private _subscribeToClickOnSubmit(className: string): void {
    const submitButton = document.querySelector(
      `${className} .general-button`
    );
    submitButton?.addEventListener("click", () => this.props.handleOnSubmit());
  }

}
