import { ChatHeader } from "./../chatHeader/ChatHeader";
import { Block } from "./../../../../utils/Block";
import { chatPanelTemplate } from "./chatPanelTemplate";
import { Avatar } from "../../../../components/avatar/Avatar";
import { ChatPageInput } from "../../../../components/chatPageInput/ChatPageInput";
import { IconButton } from "../../../../components/iconButton/IconButton";
import { MessagesList } from "../../../../components/messagesList/MessagesList";
import { Select } from "../../../../components/select/Select";
import { SelectItem } from "../../../../components/selectItem/SelectItem";
import { Message } from "../../../../components/message/Message";
import { chats as mockChats } from "../../../../utils/mockData";
import { CommonProps } from "../../../../utils/models/props";
import { onSubmitForm } from "../../../../utils/form/form";
import { WebSocketService } from "../../../../utils/webSocket";
import { MessageDto } from "../../../../utils/dto/message";
import { storeChat, StoreChatEvents } from "../../../../store/StoreChat";
import { storeCurrentUser } from "../../../../store/StoreCurrentUser";
import { router } from "../../../../index";
import "./chatPanel.scss";
import { openSelect } from "../../../../utils/openSelect";

type ChatPanelType = {
  chatHeader: ChatHeader;
  userName: string;
  messagesList: MessagesList;
  inputFooter: ChatPageInput;
  messageButton: IconButton;
  manageFileButton: IconButton;
  selectFooter: Select;
  getSelectedChat: () => number | null;
} & CommonProps;

const webSocket = new WebSocketService();

export class ChatPanel extends Block<ChatPanelType> {
  constructor() {
    super("div", {
      class: ["chat-panel__container"],
      userName: mockChats[0].display_name,
      messagesList: new MessagesList({
        timeHeader: mockChats[0].time,
        messages: [],
      }),
      inputFooter: new ChatPageInput({
        class: ["input-wrapper"],
        type: "text",
        placeholder: "message",
        name: "message",
      }),
      messageButton: new IconButton({
        class: ["message-form__button"],
        events: {
          click: (event) => {
            const values = onSubmitForm.apply<
              ChatPanel,
              [Event, string],
              { message: string }
            >(this, [event, ".message-form"]);
            const chatId = storeChat.getSelectedChatId();
            if (chatId) {
              webSocket.sendMessage(chatId, values.message);
            }
          },
        },
      }),
      manageFileButton: new IconButton({
        class: ["manage-file__button"],
        events: {
          click: (event) =>
            openSelect.apply<ChatPanel, [Event, string], void>(this, [
              event,
              "selectFooter",
            ]),
        },
      }),
      selectFooter: new Select({
        class: ["select-list-footer"],
        items: [
          new SelectItem({
            text: "Photo or video",
            classIcon: "photo-video-icon",
          }),
          new SelectItem({
            text: "File",
            classIcon: "file-icon",
          }),
          new SelectItem({
            text: "Location",
            classIcon: "location-icon",
          }),
        ],
      }),
      chatHeader: new ChatHeader(),

      getSelectedChat: () => {
        const param = router.getParams();
        if (param != null && param.chatId) {
          return param.chatId;
        }
        return false;
      },
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
