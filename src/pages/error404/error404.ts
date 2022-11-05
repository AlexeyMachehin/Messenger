import Block from "../../utils/block";
import { error404Template } from "./error404Template";
import { Props } from "../../utils/models/props";
import { render } from "../../utils/renderDOM";
import GeneralLink from "../../components/generalLink/generalLink";

type Error404Type = {
  generalLink: GeneralLink;
} & Props;

export default class Error404 extends Block<Error404Type> {
  constructor(props: Error404Type) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(error404Template, this.props);
  }
}

const error404: Error404 = new Error404({
  generalLink: new GeneralLink({
    text: "Back to the chat list",
    href: "../chats/chats.html",
  }),
  class: ["card", "error404__card"],
});

render(".main", error404);
