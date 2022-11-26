import { storeCurrentUser } from "./../../store/storeCurrentUser";
import { ROUTES } from "./../../utils/router/routes";
import { StoreTokenEvents } from "./../../store/storeToken";
import { storeChat, StoreChatEvents } from "../../store/storeChat";
import { WebSocketService } from "../../utils/webSocket";
import { ChatDto } from "./../../utils/dto/chat-dto";
import Block from "../../utils/block";
import { chatsTemplate } from "./chatsTemplate";
import { Props } from "./../../utils/models/props";
import { chats as mockChats } from "../../utils/mockData";
import { onSubmitForm } from "../../utils/form/form";
import Avatar from "../../components/avatar/avatar";
import GeneralLink from "../../components/generalLink/generalLink";
import Chat from "../../components/chat/chat";
import ChatPageInput from "../../components/chatPageInput/chatPageInput";
import Message from "../../components/message/message";
import MessagesList from "../../components/messagesList/messagesList";
import IconButton from "../../components/iconButton/iconButton";
import Select from "../../components/select/select";
import SelectItem from "../../components/selectItem/selectItem";
import ManageUserModal from "../../components/manageUserModal/manageUserModal";
import GeneralInput from "../../components/generalInput/generalInput";
import GeneralButton from "../../components/generalButton/generalButton";
import ManageChatModal from "../../components/manageChatModal/manageChatModal";
import Input from "../../components/input/input";
import "./chats.scss";
import { router } from "../../index";
import chatsController from "../../controllers/chats-controller";
import { connection } from "../../api/connection";
import { storeToken } from "../../store/storeToken";
import { store } from "../../store/store";

type ChatsType = {
  chatPageInput: ChatPageInput;
  chats: Chat[];
  generalLink: GeneralLink;
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
} & Props;

const webSocket = new WebSocketService();

export default class Chats extends Block<ChatsType> {
  constructor() {
    super("div", {
      chatPageInput: new ChatPageInput({
        class: ["input-wrapper"],
        placeholder: "search",
        type: "search",
        events: {
          change: (event) =>
            chatsController.findChat((event.target as HTMLInputElement).value),
        },
      }),
      class: ["chats-container"],
      chats: [],
      generalLink: new GeneralLink({
        text: "Profile",
        class: ["profile-link-container"],
        events: {
          click: () => router.go(ROUTES.Profile),
        },
      }),
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
              Chats,
              [Event],
              { message: string; }
            >(this, [event]);
            const chatId = storeChat.getSelectedChat().id;
            webSocket.sendMessage(chatId, values.message);
          },
        },
      }),
      manageFileButton: new IconButton({
        class: ["manage-file__button"],
        events: {
          click: (event) =>
            openSelect.apply<Chats, [Event, string], void>(this, [
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
            openSelect.apply<Chats, [Event, string], void>(this, [
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
                openDialog.apply<Chats, [string], void>(this, [
                  "addUserDialog",
                ]),
            },
          }),
          new SelectItem({
            text: "Delete user",
            classIcon: "delete-icon",
            events: {
              click: () =>
                openDialog.apply<Chats, [string], void>(this, [
                  "deleteUserDialog",
                ]),
            },
          }),
          new SelectItem({
            text: "Delete chat",
            classIcon: "delete-icon",
            events: {
              click: () =>
                openDialog.apply<Chats, [string], void>(this, [
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
        return null;
      },
    });

    this.subscribeToChangeChats();
    this.subscribeToChangeToken();
    this.subscribeToChangeMessages();

    chatsController.getChats();

    if (router.getParams()) {
      this.connectWebSocket();
    }

  }

  subscribeToChangeChats(): void {
    storeChat.on(StoreChatEvents.Updated, (state) => {
      const chats = state.map((chat: ChatDto) => {
        const chatInstance = new Chat({
          class: ["user"],
          name: chat.title,
          message: chat.last_message?.content ?? "",
          time: chat.last_message?.time ?? "",
          count: chat.unread_count,
          avatar: new Avatar({
            avatarURL: chat.avatar,
            class: ["avatar-container"],
            classImg: "avatar-container_avatar",
          }),
          id: chat.id,
          events: {
            click: () => {
              const chatId = chat.id;
              storeChat.setSelectedChat(chat);
              connection.connect(chatId).then(() => {
                const token = store.getState().token;
                if (token != null) {
                  router.go(ROUTES.ChatById(chatId), { chatId });
                  webSocket.connect({
                    chatId,
                    token,
                    userId: storeCurrentUser.getState().id,
                  });
                }
              });
            },
          },
        });
        return chatInstance;
      });
      this.setProps({ chats });
    });
  }

  subscribeToChangeToken(): void {
    storeToken.on(StoreTokenEvents.Updated, () => this.connectWebSocket());
  }

  subscribeToChangeMessages(): void {
    storeChat.on(StoreChatEvents.UpdatedMessages, (state) => {
      const messages = state
        .sort(
          (a: any, b: any) =>
            new Date(a.time).valueOf() - new Date(b.time).valueOf()
        )
        .map((message: any) => {
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
    });
  }

  private _isMyMessage(id: number) {
    const storeId = storeCurrentUser.getCurrentUser().id;
    if (id === storeId) {
      return "my-message";
    } else {
      return "user-message";
    }
  }

  connectWebSocket(): void {
    const chatId = router.getParams().chatId;
    if (chatId != null) {
      connection.connect(chatId).then(() => {
        const token = store.getState().token;
        webSocket.connect({
          chatId,
          token,
          userId: store.getState().currentUser.id,
        });
      });
    }
  }

  render(): DocumentFragment {
    return this.compile(chatsTemplate, this.props);
  }
}

function openSelect(this: Chats) {
  const indexOfEvent = 0;
  const indexOfSelect = 1;
  (this.children[arguments[indexOfSelect]] as Select).service?.open();
  (arguments[indexOfEvent] as PointerEvent).stopPropagation();
}

function openDialog(this: Chats) {
  const indexOfEvent = 0;
  (
    this.children[arguments[indexOfEvent]] as ManageUserModal
  ).service?.openDialog();
}
