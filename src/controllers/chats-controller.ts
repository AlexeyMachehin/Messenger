import ChatsAPI from "../api/chatsAPI";
import { storeChat } from "../store/storeChat";

export class ChatsController {
  public getChats(): void {
    ChatsAPI.getChats().then((data) => {
      storeChat.setChat(data);
    });
  }
  public findChat(value: string) {
    ChatsAPI.findChat(value).then((data) => {
      storeChat.setChat(data);
    });
  }
}

export default new ChatsController();
