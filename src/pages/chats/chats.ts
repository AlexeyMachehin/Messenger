import { ChatDto } from './../../utils/dto/chat-dto';
import { store, StoreEvents } from "./../../store/Store";
import Block from "../../utils/block";
import { chatsTemplate } from "./chatsTemplate";
import { Props } from "./../../utils/models/props";
import { chats as mockChats } from "../../utils/mockData";
// import { render } from "../../utils/renderDOM";
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
} & Props;

export default class Chats extends Block<ChatsType> {
  constructor() {
    super("div", {
      chatPageInput: new ChatPageInput({
        class: ["input-wrapper"],
        placeholder: "search",
        type: "search",
      }),
      class: ["chats-container"],
      chats: [],
      generalLink: new GeneralLink({
        text: "Profile",
        class: ["profile-link-container"],
        events: {
          click: () => router.go("/settings"),
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
        messages: messagesArray,
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
          click: (event) =>
            onSubmitForm.apply<Chats, [Event], void>(this, [event]),
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
    });

    store.on(StoreEvents.Updated, (state) => {
      const chats = state.chats.map(
        (chat: ChatDto) =>
          new Chat({
            class: ["user"],
            name: chat.title,
            message: chat.last_message?.content ?? '',
            time: chat.last_message?.time ?? '',
            count: chat.unread_count,
            avatar: new Avatar({
              avatarURL: chat.avatar,
              class: ["avatar-container"],
              classImg: "avatar-container_avatar",
            }),
          })
      );
      this.setProps({chats});
    });

    chatsController.getChats();
  }

  render(): DocumentFragment {
    return this.compile(chatsTemplate, this.props);
  }
}

const messagesArray =
  mockChats[0].messages?.map((message, index) => {
    if (index % 2 === 0) {
      return new Message({
        message,
        time: mockChats[0].time,
        name: mockChats[0].display_name,
        className: "my-message",
        avatar: new Avatar({
          avatarURL: mockChats[0].avatarURL,
          class: ["avatar-container"],
          classImg: "avatar-container_avatar",
        }),
      });
    }
    return new Message({
      message,
      time: mockChats[0].time,
      name: mockChats[0].display_name,
      className: "user-message",
      avatar: new Avatar({
        avatarURL: mockChats[0].avatarURL,
        class: ["avatar-container"],
        classImg: "avatar-container_avatar",
      }),
    });
  }) ?? [];

// const chatsArray = mockChats.map(
//   (chat) =>
//     new Chat({
//       class: ["user"],
//       name: chat.display_name,
//       message: chat.message,
//       time: chat.time,
//       count: chat.countMessages ?? 0,
//       avatar: new Avatar({
//         avatarURL: chat.avatarURL,
//         class: ["avatar-container"],
//         classImg: "avatar-container_avatar",
//       }),
//     })
// );

// const chats = new Chats();

// render(".main", chats);

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
