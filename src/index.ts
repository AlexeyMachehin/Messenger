import "./layouts/main/main.scss";
import ChangeData from "./pages/changeData/changeData";
import Login from "./pages/login/login";
import Registration from "./pages/registration/registration";
import ChangePassword from "./pages/changePassword/changePassword";
import Chats from "./pages/chats/chats";
import { Error404 } from "./pages/error404/error404";
import Error500 from "./pages/error500/error500";
import Profile from "./pages/profile/profile";
import Router from "./utils/router/router";
import { ROUTES } from "./utils/router/routes";

export const router = new Router(".main");

router
  .use(ROUTES.Login, Login, false)
  .use(ROUTES.SignUp, Registration)
  .use(ROUTES.Default, Login)
  .use(ROUTES.ChangeData, ChangeData)
  .use(ROUTES.ChangePassword, ChangePassword)
  .use(ROUTES.Error404, Error404)
  .use(ROUTES.Error500, Error500)
  .use(ROUTES.Profile, Profile)
  .use(ROUTES.Chats, Chats)
  .use(ROUTES.Chat, Chats)
  .start();
