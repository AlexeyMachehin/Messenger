import { storeChat } from "../store/storeChat";
import { store } from "../store/store";
import { ConnectionAPI } from "../api/connection";

const connectionAPI = new ConnectionAPI();

export class WebSocketService {
  private webSocketMap: Map<
    number,
    { webSocket: WebSocket; allMessages: any[] }
  > = new Map();

  connect(data: { chatId: number; userId: number }): void {
    if (
      process.env.YANDEX_PRAKTIKUM_WSS &&
      !this.webSocketMap.has(data.chatId)
    ) {
      connectionAPI.connect(data.chatId).then((token) => {
        new Promise<WebSocket>((res) => {
          const webSocket = new WebSocket(
            `${process.env.YANDEX_PRAKTIKUM_WSS}/ws/chats/${data.userId}/${data.chatId}/${token}`
          );
          webSocket.addEventListener("open", () => {
            store.set("isOpenWebSocket", true);
            this.sendPing(webSocket);
            res(webSocket);
          });

          webSocket.addEventListener("close", () => {
            store.set("isOpenWebSocket", false);
          });

          webSocket.addEventListener("message", (event) =>
            this.setMessage(webSocket, data.chatId, event)
          );

          webSocket.addEventListener("error", () => {});
        }).then((webSocket) => {
          this.webSocketMap.set(data.chatId, { webSocket, allMessages: [] });
          this.getMessageList(data.chatId);
        });
      });
    }
  }

  sendMessage(chatId: number, message: string): void {
    const data = {
      content: message,
      type: "message",
    };
    this.webSocketMap.get(chatId)?.webSocket.send(JSON.stringify(data));
  }

  private sendPing(webSocket: WebSocket): void {
    setInterval(
      () =>
        webSocket.send(
          JSON.stringify({
            type: "ping",
          })
        ),
      30000
    );
  }

  getMessageList(chatId: number, countMessage: number = 0) {
    this.webSocketMap.get(chatId)?.webSocket.send(
      JSON.stringify({
        content: countMessage,
        type: "get old",
      })
    );
  }

  private setMessage(
    webSocket: WebSocket,
    chatId: number,
    event: MessageEvent
  ): void {
    const data = JSON.parse(event.data);
    if (Array.isArray(data)) {
      const oldMessages = this.webSocketMap.get(chatId)?.allMessages ?? [];
      this.webSocketMap.set(chatId, {
        webSocket,
        allMessages: [...oldMessages, ...data].sort(
          (a: any, b: any) =>
            new Date(a.time).valueOf() - new Date(b.time).valueOf()
        ),
      });
      storeChat.setMessages(
        chatId,
        this.webSocketMap.get(chatId)?.allMessages ?? []
      );
    } else {
      if (data.type !== "pong" && data.type !== "user connected") {
        const oldMessages = this.webSocketMap.get(chatId)?.allMessages ?? [];
        this.webSocketMap.set(chatId, {
          webSocket,
          allMessages: [...oldMessages, data].sort(
            (a: any, b: any) =>
              new Date(a.time).valueOf() - new Date(b.time).valueOf()
          ),
        });
        storeChat.setMessages(
          chatId,
          this.webSocketMap.get(chatId)?.allMessages ?? []
        );
      }
    }
  }
}
