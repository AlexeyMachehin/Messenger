import ChatsAPI from "../api/chatsAPI";
import { storeChat } from "../store/storeChat";

export class ChatsController {
  getChats(): void {
    ChatsAPI.getChats().then((data) => {
      storeChat.setChats(data);
    });
  }
  findChat(value: string) {
    ChatsAPI.findChat(value).then((data) => {
      storeChat.setChats(data);
    });
  }
  createChat(data: { title: string }) {
    ChatsAPI.createChat(data).then(() => {
      this.getChats();
    });
  }
}

export default new ChatsController();
