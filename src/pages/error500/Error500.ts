import { Block } from "../../utils/Block";
import { error500Template } from "./error500Template";
import {GeneralLink} from "../../components/generalLink/GeneralLink";
import { router } from "../../index";
import { CommonProps } from "../../utils/models/props";
import { ROUTES } from "../../utils/router/routes";
// import "./error500.scss";

type Error500Type = {
  generalLink: GeneralLink;
} & CommonProps;

export class Error500 extends Block<Error500Type> {
  constructor() {
    super("div", {
      generalLink: new GeneralLink({
        text: "Back to the chat list",
        events: {
          click: () => router.go(ROUTES.Default),
        },
      }),
      class: ["card", "error500__card"],
    });
  }

  render(): DocumentFragment {
    return this.compile(error500Template, this.props);
  }
}
