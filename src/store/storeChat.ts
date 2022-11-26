import { ChatDto } from "../utils/dto/chat-dto";
import { Store } from "./store";

export enum StoreChatEvents {
  Updated = "chatUpdated",
  UpdatedMessages = "messagesUpdated",
}

export class StoreChat extends Store {
  setChat(chats: ChatDto[]) {
    this.set("chats", chats);
    this.emit(StoreChatEvents.Updated, this.state.chats);
  }

  setSelectedChat(chat: ChatDto) {
    this.set("selectedChat", chat);
  }

  setMessages(chatId: number, messages: any[]) {
    this.set(`chatMessages.${chatId}`, messages);
    this.emit(StoreChatEvents.UpdatedMessages, this.state.chatMessages[chatId]);
  }

  getChats(): any[] {
    return this.getState().chats;
  }

  getSelectedChat(): any {
    return this.getState().selectedChat;
  }
}

export const storeChat = new StoreChat();
