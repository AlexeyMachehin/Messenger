import { storeChat } from "../store/storeChat";
import { store } from "./../store/Store";

export class WebSocketService {
  private webSocket?: WebSocket;
  // private chatId?: number;
  // private token?: number;
  // private userId?: number;

  connect(data: { chatId: number; token: string; userId: number }): void {
    if (process.env.YANDEXPRAKTIKUMWSS) {
      new Promise((resolve, reject) => {
        this.webSocket = new WebSocket(
          `${process.env.YANDEXPRAKTIKUMWSS}/ws/chats/${data.userId}/${data.chatId}/${data.token}`
        );
        this.webSocket.addEventListener("open", () => {
          store.set("isOpenWebSocket", true);
          resolve(true);
        });

        this.webSocket.addEventListener("close", () =>
          store.set("isOpenWebSocket", false)
        );

        this.webSocket.addEventListener("message", (event) => {
          storeChat.setMessages(JSON.parse(event.data));
        });

        this.webSocket.addEventListener("error", () => {
          reject(false);
        });
      }).then(() => this.getMessageList());
    }
  }

  sendMessage(message: string): void {
    this.webSocket?.send(
      JSON.stringify({
        content: message,
        type: "message",
      })
    );
  }

  getMessageList(countMessage: number = 0) {
    this.webSocket?.send(
      JSON.stringify({
        content: countMessage,
        type: "get old",
      })
    );
  }
}
