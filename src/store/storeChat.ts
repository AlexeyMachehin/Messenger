import { ChatDto } from "../utils/dto/chat-dto";
import { Store } from "./Store";

export enum StoreChatEvents {
  Updated = "chatUpdated",
  UpdatedMessages = "messagesUpdated",
}

export class StoreChat extends Store {
  setChat(chats: ChatDto[]) {
    this.set("chats", chats);
    this.emit(StoreChatEvents.Updated, this.state.chats);
  }

  setMessages(messages: any[]) {
    this.set("messages", messages);
    this.emit(StoreChatEvents.UpdatedMessages, this.state.messages);
  }
}

export const storeChat = new StoreChat();
