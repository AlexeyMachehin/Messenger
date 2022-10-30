import { Dialog } from "./../dialogModal/dialogService";
import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import GeneralButton from "../generalButton/generalButton";
import { manageChatModalTemplate } from "./manageChatModalTemplate";

export default class ManageChatModal extends Block {
  service: Dialog;
  constructor(
    props: Props & {
      generalButton: GeneralButton;
      title: string;
    }
  ) {
    super("dialog", props);
  }

  componentDidMount(): void {
    const classes = this.props.class?.map((cl) => "." + cl);
    this.service = new Dialog(classes?.join("") ?? "");
  }

  render(): DocumentFragment {
    return this.compile(manageChatModalTemplate, this.props);
  }
}
