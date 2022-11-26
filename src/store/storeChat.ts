import { MessageDto } from "./../utils/dto/message-dto";
import { ChatDto } from "../utils/dto/chat-dto";
import { Store } from "./Store";

export enum StoreChatEvents {
  Updated = "chatUpdated",
  UpdatedMessages = "messagesUpdated",
}

export class StoreChat extends Store {
  setChats(chats: ChatDto[]) {
    this.set("chats", chats);
    this.emit(StoreChatEvents.Updated, this.state.chats);
  }

  setMessages(messages: MessageDto[] | null) {
    const oldMessage = this.getState().messages;
    if (messages) {
      this.set("messages", [...(oldMessage ? oldMessage : []), ...messages]);
    }
    this.emit(StoreChatEvents.UpdatedMessages, this.state.messages);
  }

  getMessages(): MessageDto[] | null {
    return this.getState().messages;
  }
}

export const storeChat = new StoreChat();
