import { compile } from "pug";
import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { avatarTemplate } from "./avatarTemplate";

export default class Avatar extends Block {
  constructor(props: Props & { avatarURL: string, classImg: string }) {
    // super("div", { ...props, class: "avatar-container" });
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(avatarTemplate, this.props);
  }
}
