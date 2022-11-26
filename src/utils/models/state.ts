import { ChatDto } from "./../dto/chat-dto";
import { UserDto } from "./../dto/user-dto";
export type State = {
  currentUser: UserDto | null;
  isAuth: boolean;
  chats: ChatDto[] | null;
  token: string | null;
};
