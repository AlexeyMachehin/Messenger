import { storeChat } from "../store/StoreChat";
import { store } from "../store/Store";
import { ConnectionAPI } from "../api/Connection";
import { UserController } from '../controllers/User';

const connectionAPI = new ConnectionAPI();
const userController = new UserController();
export class WebSocketService {
  private webSocketMap: Map<
    number,
    { webSocket: WebSocket; allMessages: any[]; }
  > = new Map();

  connect(data: { chatId: number; userId: number; }): void {
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

          webSocket.addEventListener("error", () => { });
        }).then((webSocket) => {
          this.webSocketMap.set(data.chatId, { webSocket, allMessages: [] });
          this.getMessageList(data.chatId);
        });
      });
    } else {
      storeChat.triggerMessages(data.chatId);
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

  private async setMessage(
    webSocket: WebSocket,
    chatId: number,
    event: MessageEvent
  ): Promise<void> {
    const data = JSON.parse(event.data);
    const setData = new Set<number>();
    let newData: any[] = [];
    if (Array.isArray(data)) {
      data.forEach(i => setData.add(i.user_id));
      await Promise.all(Array.from(setData.values()).map(item => userController.getUserById(item))).then(users => {
        users.forEach(user => {
          if (user != null) {
            storeChat.setChatUser(user);
          }
        });
        newData = data.map(item => {
          const user = users.find(user => user?.id === item.user_id);
          return {
            ...item,
            user_name: user?.first_name,
            user_avatar: user?.avatar
          };
        });
      });
      const oldMessages = this.webSocketMap.get(chatId)?.allMessages ?? [];
      this.webSocketMap.set(chatId, {
        webSocket,
        allMessages: [...oldMessages, ...newData].sort(
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
        let newMessage: any[] = [];
        let messageUser = storeChat.getChatUser(data.user_id);
        if (messageUser) {
          newMessage.push({
            ...data,
            user_name: messageUser?.first_name,
            user_avatar: messageUser?.avatar
          });
        } else {
          await userController.getUserById(data.user_id).then(user => {
            if (user) {
              newMessage.push({
                ...data,
                user_name: user?.first_name,
                user_avatar: user?.avatar
              });
            }
          });
        }
        const oldMessages = this.webSocketMap.get(chatId)?.allMessages ?? [];
        this.webSocketMap.set(chatId, {
          webSocket,
          allMessages: [...oldMessages, ...newMessage].sort(
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
