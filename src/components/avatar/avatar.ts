import { compile } from "pug";
import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { avatarTemplate } from "./avatarTemplate";

export default class Avatar extends Block {
  constructor(props: Props & { avatarURL: string }) {
    super("div", { ...props, class: "avatar-container" });
  }

  render(): DocumentFragment {
    return this.compile(avatarTemplate, this.props);
  }
}
