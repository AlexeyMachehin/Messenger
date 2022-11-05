import Block from "../../utils/block";
import { error500Template } from "./error500Template";
import { Props } from "../../utils/models/props";
import { render } from "../../utils/renderDOM";
import GeneralLink from "../../components/generalLink/generalLink";

type Error500Type = {
  generalLink: GeneralLink;
} & Props;

export default class Error500 extends Block<Error500Type> {
  constructor(props: Error500Type) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(error500Template, this.props);
  }
}

const error500 = new Error500({
  generalLink: new GeneralLink({
    text: "Back to the chat list",
    href: "../chats/chats.html",
  }),
  class: ["card", "error500__card"],
});

render(".main", error500);
