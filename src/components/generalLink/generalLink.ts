import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { generalLinkTemplate } from "./generalLinkTemplate";

export default class GeneralLink extends Block {
  constructor(props: Props & { text: string; href: string }) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(generalLinkTemplate, this.props);
  }
}
