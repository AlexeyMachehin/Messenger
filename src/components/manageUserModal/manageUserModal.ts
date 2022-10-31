import { manageUserModalTemplate } from "./manageUserModalTemplate";
import { Dialog } from "../dialogModal/dialogService";
import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import GeneralInput from "../generalInput/generalInput";
import GeneralButton from "../generalButton/generalButton";

type DialogProps = Props & {
  title: string;
  generalInput: GeneralInput;
  generalButton: GeneralButton;
};

export default class ManageUserModal extends Block {
  service: Dialog;
  constructor(props: DialogProps) {
    super("dialog", { ...props, class: [...(props.class ?? []), "dialog"] });
  }

  componentDidMount(): void {
    const classes = this.props.class?.map((cl) => "." + cl);
    this.service = new Dialog(classes?.join("") ?? "");
  }

  render(): DocumentFragment {
    return this.compile(manageUserModalTemplate, this.props);
  }
}
