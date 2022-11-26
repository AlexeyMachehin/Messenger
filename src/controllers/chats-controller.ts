import ChatsAPI from "../api/chatsAPI";
import { storeChat } from "../store/storeChat";

export class ChatsController {
  public getChats(): void {
    ChatsAPI.getChats().then((data) => {
      storeChat.setChats(data);
    });
  }
  public findChat(value: string) {
    ChatsAPI.findChat(value).then((data) => {
      storeChat.setChats(data);
    });
  }
  public createChat(data: {title:string}) {
    ChatsAPI.createChat(data).then(() => {
      this.getChats();
    });
  }
}

export default new ChatsController();
