import { WebSocketService } from './../../../../utils/webSocket';
import { ChatFooter } from "./../../chatFooter/ChatFooter";
import { ChatHeader } from "./../chatHeader/ChatHeader";
import { Block } from "./../../../../utils/Block";
import { chatPanelTemplate } from "./chatPanelTemplate";
import { Avatar } from "../../../../components/avatar/Avatar";
import { MessagesList } from "../../../../components/messagesList/MessagesList";
import { Message } from "../../../../components/message/Message";
import { chats as mockChats } from "../../../../utils/mockData";
import { CommonProps } from "../../../../utils/models/props";
import { MessageDto } from "../../../../utils/dto/message";
import { storeChat, StoreChatEvents } from "../../../../store/StoreChat";
import { storeCurrentUser } from "../../../../store/StoreCurrentUser";
import { router } from "../../../../index";
import "./chatPanel.scss";

type ChatPanelType = {
  chatHeader: ChatHeader;
  userName: string;
  messagesList: MessagesList;

  getSelectedChat: () => number | null;
} & CommonProps;

export class ChatPanel extends Block<ChatPanelType> {
  constructor(webSocket: WebSocketService) {
    super("div", {
      class: ["chat-panel__container"],
      userName: mockChats[0].display_name,
      messagesList: new MessagesList({
        timeHeader: mockChats[0].time,
        messages: [],
      }),
      chatHeader: new ChatHeader(),
      getSelectedChat: () => {
        const param = router.getParams();
        if (param != null && param.chatId) {
          return param.chatId;
        }
        return false;
      },
      chatFooter: new ChatFooter(webSocket),
    });

    this.subscribeToChangeMessages();
  }

  subscribeToChangeMessages(): void {
    storeChat.on(StoreChatEvents.UpdatedMessages, (state) =>
      this.createMessageComponent(state)
    );
  }

  createMessageComponent(state: MessageDto[]): void {
    const messages = state
      .sort(
        (a: any, b: any) =>
          new Date(a.time).valueOf() - new Date(b.time).valueOf()
      )
      .map((message: MessageDto) => {
        return new Message({
          message: message.content,
          time: new Date(message.time).toLocaleTimeString(),
          name: message.user_id,
          className: this._isMyMessage(message.user_id),
          avatar: new Avatar({
            avatarURL: mockChats[0].avatarURL,
            class: ["avatar-container"],
            classImg: "avatar-container_avatar",
          }),
        });
      });
    if (!Array.isArray(this.children.messagesList)) {
      this.children.messagesList.setProps({ messages });
    }
  }

  private _isMyMessage(id: number) {
    const storeId = storeCurrentUser.getCurrentUser()?.id;
    if (id === storeId) {
      return "my-message";
    } else {
      return "user-message";
    }
  }

  render(): DocumentFragment {
    return this.compile(chatPanelTemplate, this.props);
  }
}
