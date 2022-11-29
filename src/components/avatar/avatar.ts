import Block from "../../utils/block";
import { avatarTemplate } from "./avatarTemplate";
import { CommonProps } from "./../../utils/models/props";

export type AvatarType = {
  avatarURL: string;
  classImg: string;
} & CommonProps;

export default class Avatar extends Block<AvatarType> {
  constructor(props: AvatarType) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(avatarTemplate, this.props);
  }
}
