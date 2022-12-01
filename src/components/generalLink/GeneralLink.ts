import { Block } from "../../utils/Block";
import { generalLinkTemplate } from "./generalLinkTemplate";
import { CommonProps } from "../../utils/models/props";

type GeneralLinkType = {
  text: string;
  href?: string;
} & CommonProps;

export class GeneralLink extends Block<GeneralLinkType> {
  constructor(props: GeneralLinkType) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(generalLinkTemplate, this.props);
  }
}
