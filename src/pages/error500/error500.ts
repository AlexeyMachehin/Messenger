import GeneralLink from "../../components/generalLink/generalLink";
import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import { render } from "../../utils/renderDOM";
import { error500Template } from "./error500Template";

export default class Error404 extends Block {
  constructor(props: Props & { generalLink: Block }) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(error500Template, this.props);
  }
}

const error500: Error404 = new Error404({
  generalLink: new GeneralLink({
    text: "Back to the chat list",
    href: "../../pages/chat/chat.pug",
  }),
  class: "card",
});

render(".main", error500);
