import { storeChat } from "../store/storeChat";
import { store } from "../store/Store";

export class WebSocketService {
  private webSocket?: WebSocket;

  connect(data: { chatId: number; token: string; userId: number; }): void {
    if (process.env.YANDEXPRAKTIKUMWSS) {
      new Promise((resolve, reject) => {
        this.webSocket = new WebSocket(
          `${process.env.YANDEXPRAKTIKUMWSS}/ws/chats/${data.userId}/${data.chatId}/${data.token}`
        );
        this.webSocket.addEventListener("open", () => {
          store.set("isOpenWebSocket", true);
          this.sendPing();
          resolve(true);
        });

        this.webSocket.addEventListener("close", () => {
          store.set("isOpenWebSocket", false);
        }
        );

        this.webSocket.addEventListener("message", (event) => {
          const data = JSON.parse(event.data);
          if (Array.isArray(data)) {
            storeChat.setMessages(data);
          } else {
            if (data.type !== 'pong' && data.type !=="user connected") {
              storeChat.setMessages([data]);
            }
          }
        });

        this.webSocket.addEventListener("error", () => {
          reject(false);
        });
      }).then(() => this.getMessageList());
    }
  }

  sendMessage(message: string): void {
    const data = {
      content: message,
      type: "message",
    };
    this.webSocket?.send(
      JSON.stringify(data)
    );
  }

  private sendPing(): void {
    setInterval(
      () =>
        this.webSocket?.send(
          JSON.stringify({
            type: "ping",
          })
        ),
      30000
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