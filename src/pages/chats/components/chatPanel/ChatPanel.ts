import { Block } from "./../../../../utils/Block";
import { chatPanelTemplate } from "./chatPanelTemplate";
import { Avatar } from "../../../../components/avatar/Avatar";
import { ChatPageInput } from "../../../../components/chatPageInput/ChatPageInput";
import { IconButton } from "../../../../components/iconButton/IconButton";
import { ManageChatModal } from "../../../../components/manageChatModal/ManageChatModal";
import { ManageUserModal } from "../../../../components/manageUserModal/ManageUserModal";
import { MessagesList } from "../../../../components/messagesList/MessagesList";
import { Select } from "../../../../components/select/Select";
import { GeneralButton } from "../../../../components/generalButton/GeneralButton";
import { GeneralInput } from "../../../../components/generalInput/GeneralInput";
import { Input } from "../../../../components/input/Input";
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
import './chatPanel.scss'

type ChatPanelType = {
  avatarHeader: Avatar;
  userName: string;
  messagesList: MessagesList;
  inputFooter: ChatPageInput;
  messageButton: IconButton;
  manageFileButton: IconButton;
  selectFooter: Select;
  manageUserButton: IconButton;
  selectHeader: Select;
  deleteUserDialog: ManageUserModal;
  addUserDialog: ManageUserModal;
  manageChatModal: ManageChatModal;
  getSelectedChat: () => number | null;
} & CommonProps;

const webSocket = new WebSocketService();

export class ChatPanel extends Block<ChatPanelType> {
  constructor() {
    super("div", {
      class: ["chat-panel__container"],
      avatarHeader: new Avatar({
        avatarURL: mockChats[0].avatarURL,
        class: ["avatar-container"],
        classImg: "avatar-container_avatar",
      }),
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
      manageUserButton: new IconButton({
        class: ["manage-user__button"],
        events: {
          click: (event) =>
            openSelect.apply<ChatPanel, [Event, string], void>(this, [
              event,
              "selectHeader",
            ]),
        },
      }),
      selectHeader: new Select({
        class: ["select-list-header"],
        items: [
          new SelectItem({
            text: "Add user",
            classIcon: "add-icon",
            events: {
              click: () =>
                openDialog.apply<ChatPanel, [string], void>(this, [
                  "addUserDialog",
                ]),
            },
          }),
          new SelectItem({
            text: "Delete user",
            classIcon: "delete-icon",
            events: {
              click: () =>
                openDialog.apply<ChatPanel, [string], void>(this, [
                  "deleteUserDialog",
                ]),
            },
          }),
          new SelectItem({
            text: "Delete chat",
            classIcon: "delete-icon",
            events: {
              click: () =>
                openDialog.apply<ChatPanel, [string], void>(this, [
                  "manageChatModal",
                ]),
            },
          }),
        ],
      }),
      deleteUserDialog: new ManageUserModal({
        class: ["deleteUserModal"],
        title: "Delete user",
        generalInput: new GeneralInput({
          label: "login",
          input: new Input({
            attr: {
              type: "login",
              name: "login",
              required: true,
            },
          }),
          errorText: "",
        }),
        generalButton: new GeneralButton({
          buttonText: "Delete user",
        }),
      }),
      addUserDialog: new ManageUserModal({
        class: ["addUserModal"],
        title: "Add user",
        generalInput: new GeneralInput({
          label: "login",
          input: new Input({
            attr: {
              type: "login",
              name: "login",
              maxLength: 20,
              minLength: 3,
              required: true,
            },
          }),
          errorText: "Invalid login",
        }),
        generalButton: new GeneralButton({
          buttonText: "Add user",
        }),
      }),
      manageChatModal: new ManageChatModal({
        class: ["deleteChatModal"],
        title: "Are you sure you want to delete the chat?",
        generalButton: new GeneralButton({
          buttonText: "Delete",
        }),
      }),
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

function openSelect(this: ChatPanel): void {
  /** Event of click. */
  const indexOfEvent = 0;
  /** Component Select. */
  const indexOfSelect = 1;

  (this.children[arguments[indexOfSelect]] as Select).service?.open();
  (arguments[indexOfEvent] as PointerEvent).stopPropagation();
}

function openDialog(this: ChatPanel) {
  /** Event of click. */
  const indexOfEvent = 0;
  (
    this.children[arguments[indexOfEvent]] as ManageUserModal
  ).service?.openDialog();
}
