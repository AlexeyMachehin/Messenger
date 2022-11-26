import { MessageDto } from "./../utils/dto/message-dto";
import { ChatDto } from "./../utils/dto/chat-dto";
import { UserDto } from "../utils/dto/user-dto";
import { EventBus } from "../utils/eventBus";

interface State  {
  currentUser: UserDto | null;
  isAuth: boolean | null;
  chats: ChatDto[] | null;
  token: string | null;
  messages: MessageDto[] | null;
}

export enum StoreEvents {
  Updated = "updated",
}
const initialState = {
  currentUser: null,
  isAuth: false,
  chats: null,
  token: null,
  messages: null,
};

export class Store extends EventBus {
  state: State = initialState;

  public getState() {
    return this.state;
  }

  public set(pathName: string, newState: any): void {
    this.state[pathName as keyof typeof initialState] = newState;
  }
}

export const store = new Store();
