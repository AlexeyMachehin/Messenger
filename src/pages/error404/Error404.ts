import Block from "../../utils/Block";
import { error404Template } from "./error404Template";
import {GeneralLink} from "../../components/generalLink/GeneralLink";
import { router } from "../../index";
import { CommonProps } from "../../utils/models/props";
import { ROUTES } from "../../utils/router/routes";
import "./error404.scss";

type Error404Type = {
  generalLink: GeneralLink;
} & CommonProps;

export class Error404 extends Block<Error404Type> {
  constructor() {
    super("div", {
      generalLink: new GeneralLink({
        text: "Back to the chat list",
        events: {
          click: () => router.go(ROUTES.Default),
        },
      }),
      class: ["card", "error404__card"],
    });
  }

  render(): DocumentFragment {
    return this.compile(error404Template, this.props);
  }
}
