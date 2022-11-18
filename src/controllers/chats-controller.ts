import ChatsAPI from "../api/chatsAPI";
import { store } from "./../store/Store";

export class ChatsController {
  public getChats(): void {
    ChatsAPI.getChats()
    .then((data) => {
      store.set("chats", data);
    });
  }
}

export default new ChatsController();
