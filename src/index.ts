import "./layouts/main/main.scss";
import {ChangeData} from "./pages/ChangeData/ChangeData";
import {Login} from "./pages/Login/Login";
import {Registration} from "./pages/Registration/Registration";
import {ChangePassword} from "./pages/ChangePassword/ChangePassword";
import {Chats} from "./pages/Chats/Chats";
import {Error404} from "./pages/Error404/Error404";
import {Error500} from "./pages/Error500/Error500";
import {Profile} from "./pages/Profile/Profile";
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
