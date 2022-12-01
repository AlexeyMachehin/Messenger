import { MessageDto } from "../utils/dto/message";
import { ChatDto } from "../utils/dto/chat";
import { Store } from "./Store";
import { UserDto } from '../utils/dto/user';

export enum StoreChatEvents {
  Updated = "chatUpdated",
  UpdatedMessages = "messagesUpdated",
  UpdatedSelectedChatId = "selectedChatIdUpdated",
}

export class StoreChat extends Store {
  chatUsers = new Map<number, UserDto>();

  setChatUser(user: UserDto) {
    if (this.chatUsers.has(user.id)) {
      return;
    }
    this.chatUsers.set(user.id, user);
  }

  setChats(chats: ChatDto[]) {
    this.set("chats", chats);
    this.emit(StoreChatEvents.Updated, this.state.chats);
  }

  setMessages(chatId: number, messages: MessageDto[] | null) {
    if (messages) {
      this.set(`chatMessages.${chatId}`, messages);
    }
    this.emit(
      StoreChatEvents.UpdatedMessages,
      this.state.chatMessages ? this.state.chatMessages[chatId] : []
    );
  }

  triggerMessages(chatId: number): void {
    this.emit(
      StoreChatEvents.UpdatedMessages,
      this.state.chatMessages ? this.state.chatMessages[chatId] : []
    );
  }

  setSelectedChat(chat: ChatDto | null) {
    this.set("selectedChat", chat);
  }

  setSelectedChatId(chat: number | null) {
    this.set("selectedChatId", chat);
    this.emit(StoreChatEvents.UpdatedSelectedChatId, this.state.selectedChatId);
  }

  getChats(): ChatDto[] | null {
    return this.getState().chats;
  }

  getSelectedChat(): ChatDto | null {
    return this.getState().selectedChat;
  }

  getSelectedChatId(): number | null {
    return this.getState().selectedChatId;
  }

  getMessages(chatId: number): MessageDto[] | null {
    const chatMessages = this.getState().chatMessages;
    return chatMessages ? chatMessages[chatId] : null;
  }

  getChatUser(userId: number): UserDto | undefined {
    return this.chatUsers.has(userId) ? this.chatUsers.get(userId) : undefined;
  }
}

export const storeChat = new StoreChat();
