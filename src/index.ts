import "./layouts/main/main.scss";
import {ChangeData} from "./pages/changeData/ChangeData";
import {Login} from "./pages/login/Login";
import {Registration} from "./pages/registration/Registration";
import {ChangePassword} from "./pages/changePassword/ChangePassword";
import {Chats} from "./pages/chats/Chats";
import {Error404} from "./pages/error404/Error404";
import {Error500} from "./pages/error500/Error500";
import {Profile} from "./pages/profile/Profile";
import {Router} from "./utils/router/router";
import { ROUTES } from "./utils/router/routes";

export const router = new Router(".main");

router
  .use(ROUTES.Login, Login, false)
  .use(ROUTES.SignUp, Registration, false)
  .use(ROUTES.Default, Login, false)
  .use(ROUTES.ChangeData, ChangeData)
  .use(ROUTES.ChangePassword, ChangePassword)
  .use(ROUTES.Error404, Error404)
  .use(ROUTES.Error500, Error500)
  .use(ROUTES.Profile, Profile)
  .use(ROUTES.Chats, Chats)
  .use(ROUTES.Chat, Chats)
  .start();
