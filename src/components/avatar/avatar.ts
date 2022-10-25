import { Block } from "../../utils/block";
import { avatarTemplate } from "./avatarTemplate";

export default class Avatar extends Block {
  constructor(props: { avatarURL: string }) {
    super(avatarTemplate(props), props);
  }
}
