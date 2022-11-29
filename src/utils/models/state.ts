import { ChatDto } from "../dto/chat";
import { UserDto } from "../dto/user";

export type State = {
  currentUser: UserDto | null;
  isAuth: boolean;
  chats: ChatDto[] | null;
  token: string | null;
};
