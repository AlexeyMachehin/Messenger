import { Block } from "../../utils/Block";
import { chatsTemplate } from "./chatsTemplate";
import { AsidePanel } from "./components/asidePanel/AsidePanel";
import { ChatPanel } from "./components/chatPanel/CHatPanel";
import { CommonProps } from "../../utils/models/props";
import { WebSocketService } from "../../utils/webSocket";
import { storeCurrentUser } from "../../store/StoreCurrentUser";
import { storeChat } from "../../store/StoreChat";
import { ChatsController } from "../../controllers/Chats";
import { router } from "../../index";
import "./chats.scss";

type ChatsType = {
  asidePanel: AsidePanel;
  chatPanel: ChatPanel;
} & CommonProps;

const webSocket = new WebSocketService();
const chatsController = new ChatsController();

export class Chats extends Block<ChatsType> {
  constructor() {
    super("div", {
      class: ["chats-container"],
      asidePanel: new AsidePanel(),
      chatPanel: new ChatPanel(),
    });

    this.initValue();
  }

  private initValue(): void {
    chatsController.getChats();
    const chatId = router.getParams()?.chatId;
    if (chatId) {
      storeChat.setSelectedChatId(chatId);
      this.connectWebSocket(chatId);
    }
  }

  connectWebSocket(chatId: number): void {
    if (chatId != null) {
      const user = storeCurrentUser.getCurrentUser();
      if (user) {
        webSocket.connect({
          chatId,
          userId: user.id,
        });
      }
    }
  }

  render(): DocumentFragment {
    return this.compile(chatsTemplate, this.props);
  }
}
