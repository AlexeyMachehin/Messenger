import { ChatsAPI } from "../api/Chats";
import { storeChat } from "../store/StoreChat";

const chatsAPI = new ChatsAPI();

export class ChatsController {
  async getChats(): Promise<void> {
    try {
      const data = await chatsAPI.getChats();
      storeChat.setChats(data);
    } catch (error) {
      alert(`Server error: ${(error as any).reason}. Try again`);
    }
  }
  async findChat(value: string): Promise<void> {
    try {
      const data = await chatsAPI.findChat(value);
      storeChat.setChats(data);
    } catch (error) {
      alert(`Server error: ${(error as any).reason}. Try again`);
    }
  }
  async createChat(data: { title: string }): Promise<void> {
    try {
      await chatsAPI.createChat(data);
      this.getChats();
    } catch (error) {
      alert(`Server error: ${(error as any).reason}. Try again`);
    }
  }
  async deleteChat(data: { chatId: number; }): Promise<void> {
    try {
      await chatsAPI.deleteChat(data);
      this.getChats();
    } catch (error) {
      alert(`Server error: ${(error as any).reason}. Try again`);
    }
  }
}
