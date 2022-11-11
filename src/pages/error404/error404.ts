import Block from "../../utils/block";
import { error404Template } from "./error404Template";
import { Props } from "../../utils/models/props";
// import { render } from "../../utils/renderDOM";
import GeneralLink from "../../components/generalLink/generalLink";
import "./error404.scss";
import { router } from '../../index';

type Error404Type = {
  generalLink: GeneralLink;
} & Props;

export class Error404 extends Block<Error404Type> {
  constructor() {
    super("div", {
      generalLink: new GeneralLink({
        text: "Back to the chat list",
        events: {
          click: () => router.go("/")
        },
      }),
      class: ["card", "error404__card"],
    });
  }

  render(): DocumentFragment {
    return this.compile(error404Template, this.props);
  }
}

// export const error404: Error404 = new Error404();

// render(".main", error404);
