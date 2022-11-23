import { store } from "./../store/Store";

export class WebSocketService {
  private webSocket?: WebSocket;
  private chatId?: number;
  private token?: number;
  private userId?: number;

  connect(data: { chatId: number; token: string; userId: number }): void {
    if (process.env.YANDEXPRAKTIKUMWSS) {
      this.webSocket = new WebSocket(
        `${process.env.YANDEXPRAKTIKUMWSS}/ws/chathhs/${data.userId}/${data.chatId}/${data.token}`
      );

      this.webSocket.addEventListener("open", () =>
        store.set("isOpenWebSocket", true)
      );

      this.webSocket.addEventListener("close", () =>
        store.set("isOpenWebSocket", false)
      );

      this.webSocket.addEventListener("message", (event) => {
        console.log("Получены данные", event);
      });

      this.webSocket.addEventListener("error", (event) => {
        console.log("Ошибка", (event as any).message);
      });
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

  getMessageList(countMessage?: number = 0) {
    this.webSocket?.send(
      JSON.stringify({
        content: countMessage,
        type: "get old",
      })
    );
  }
}
