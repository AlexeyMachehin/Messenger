import Block from "../../utils/block";
import { generalLinkTemplate } from "./generalLinkTemplate";
import { Props } from "../../utils/models/props";

type GeneralLinkType = {
  text: string;
  href?: string;
} & Props;

export default class GeneralLink extends Block<GeneralLinkType> {
  constructor(props: GeneralLinkType) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(generalLinkTemplate, this.props);
  }
}
