import { ChatsAPI } from "../api/chats";
import { storeChat } from "../store/storeChat";

const chatsAPI = new ChatsAPI();

export class ChatsController {
  getChats(): void {
    chatsAPI.getChats().then((data) => {
      storeChat.setChats(data);
    });
  }
  findChat(value: string) {
    chatsAPI.findChat(value).then((data) => {
      storeChat.setChats(data);
    });
  }
  createChat(data: { title: string }) {
    chatsAPI.createChat(data).then(() => {
      this.getChats();
    });
  }
}
