import Block from "../../utils/block";
import { error500Template } from "./error500Template";
import { Props } from "../../utils/models/props";
// import { render } from "../../utils/renderDOM";
import GeneralLink from "../../components/generalLink/generalLink";
import "./error500.scss"
import { router } from '../../index';
import { ROUTES } from "../../utils/router/routes";

type Error500Type = {
  generalLink: GeneralLink;
} & Props;

export default class Error500 extends Block<Error500Type> {
  constructor() {
    super("div", {
      generalLink: new GeneralLink({
        text: "Back to the chat list",
        events: {
          click: () => router.go(ROUTES.Default)
        },
      }),
      class: ["card", "error500__card"],
    });
  }

  render(): DocumentFragment {
    return this.compile(error500Template, this.props);
  }
}

// export const error500: Error500 = new Error500();

// render(".main", error500);
