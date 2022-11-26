import { MessageDto } from "./../utils/dto/message-dto";
import { ChatDto } from "../utils/dto/chat-dto";
import { Store } from "./store";

export enum StoreChatEvents {
  Updated = "chatUpdated",
  UpdatedMessages = "messagesUpdated",
}

export class StoreChat extends Store {
  setChats(chats: ChatDto[]) {
    this.set("chats", chats);
    this.emit(StoreChatEvents.Updated, this.state.chats);
  }

  setMessages(chatId: number, messages: MessageDto[] | null) {
    const container = this.getState().chatMessages;
    const oldMessage = container ? container[chatId] : [];
    if (messages) {
      this.set(`chatMessages.${chatId}`, [
        ...(oldMessage ? oldMessage : []),
        ...messages,
      ]);
    }
    this.emit(StoreChatEvents.UpdatedMessages, this.state.chatMessages ? this.state.chatMessages[chatId] : []);
  }

  setSelectedChat(chat: ChatDto) {
    this.set("selectedChat", chat);
  }

  getChats(): ChatDto[] | null {
    return this.getState().chats;
  }

  getSelectedChat(): ChatDto | null {
    return this.getState().selectedChat;
  }
}

export const storeChat = new StoreChat();
