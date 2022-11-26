export const ROUTES = {
  ChangeData: "/change-data",
  Login: "/login",
  SignUp: "/sign-up",
  ChangePassword: "/change-password",
  Error404: "/error404",
  Error500: "/error500",
  Profile: "/settings",
  Chats: "/messenger",
  Chat: "/messenger/{chatId}",
  ChatById: (chatId: number) => `/messenger/${chatId}`,
  Default: "/",
} as const;
