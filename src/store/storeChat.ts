import { ChatDto } from "../utils/dto/chat-dto";
import { Store } from "./Store";

export enum StoreChatEvents {
  Updated = "chatUpdated",
}

export class StoreChat extends Store {
  setChat(chats: ChatDto[]) {
    this.set("chats", chats);
    this.emit(StoreChatEvents.Updated, this.state.chats);
  }
}

export const storeChat = new StoreChat();
