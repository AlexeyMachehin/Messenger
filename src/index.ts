import "./layouts/main/main.scss";
import ChangeData from './pages/changeData/changeData';
import Login from './pages/login/login';
import Router from './utils/router/router';
import Registration from './pages/registration/registration';
import ChangePassword from './pages/changePassword/changePassword';
import Chats from './pages/chats/chats';
import { Error404 } from './pages/error404/error404';
import Error500 from './pages/error500/error500';
import Profile from './pages/profile/profile';

export const router = new Router(
    // "/Login", Login,
    ".main");


router.use("/change-data", ChangeData)
    .use("/change-password", ChangePassword)
    .use("/error404", Error404)
    .use("/error500", Error500)
    .use("/login", Login)
    .use("/settings", Profile)
    .use("/messenger", Chats)
    .use("/sign-up", Registration).start();