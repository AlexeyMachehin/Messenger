import { chats } from "./../chat/mockData";
import { chats as mockChats } from "./mockData";
import Avatar from "../../components/avatar/avatar";
import Block from "../../utils/block";
import { render } from "../../utils/renderDOM";
import { chatsTemplate } from "./chatsTemplate";
import GeneralLink from "../../components/generalLink/generalLink";
import { Props } from "../../utils/models/props";
import Chat from "../../components/chat/chat";
import ChatPageInput from "../../components/chatPageInput/chatPageInput";
import Message from "../../components/message/message";
import MessagesList from "../../components/messagesList/messagesList";
// import { Dialog } from "../../components/dialogModal/dialogService";

// const addUserModal = new Dialog(".addUserModal");
// const deleteUserDialog = new Dialog(".deleteUserModal");
// const deleteChatModal = new Dialog(".deleteChatModal");

// const addUserButton = document.querySelector("#addUser");
// const deleteUserButton = document.querySelector("#DeleteUser");
// const deleteChatButton = document.querySelector("#DeleteChat");

// addUserButton?.addEventListener("click", () => addUserModal.openDialog());
// deleteUserButton?.addEventListener("click", () => deleteUserDialog.openDialog());
// deleteChatButton?.addEventListener("click", () => deleteChatModal.openDialog());

// const selectListHeader = document.querySelector(".chat__header-container");
// const selectListFooter = document.querySelector(".chat__footer-container");
// const addDeleteUserButton = document.querySelector(".manage-user__button");
// const addFileButton = document.querySelector(".manage-file__button");
// const body = document.querySelector("body");

// addDeleteUserButton?.addEventListener("click", (e) => {
//   selectListFooter?.classList.remove("active");
//   selectListHeader?.classList.toggle("active");
//   e.stopPropagation();
// });

// addFileButton?.addEventListener("click", (e) => {
//   selectListHeader?.classList.remove("active");
//   selectListFooter?.classList.toggle("active");
//   e.stopPropagation();
// });

// body?.addEventListener("click", () => {
//   selectListHeader?.classList.remove("active");
//   selectListFooter?.classList.remove("active");
// });

class Chats extends Block {
  constructor(
    props: Props & { chats: any[]; generalLink: Block; chatPageInput: Block }
  ) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(chatsTemplate, this.props);
  }
}

const messagesArray: Message[] = mockChats[0].messages?.map(
  (message, index) => {
    if (index % 2 === 0) {
      return new Message({
        message,
        time: mockChats[0].time,
        name: mockChats[0].display_name,
        className: "my-message",
        avatar: new Avatar({
          avatarURL: mockChats[0].avatarURL,
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
      }),
    });
  }
);

const chatsArray: Chat[] = mockChats.map(
  (chat) =>
    new Chat({
      class: "user",
      name: chat.display_name,
      message: chat.message,
      time: chat.time,
      count: chat.countMessages ?? 0,
      avatar: new Avatar({
        avatarURL: chat.avatarURL,
      }),
    })
);

const chats: Chats = new Chats({
  chatPageInput: new ChatPageInput({
    class: "input-wrapper",
    placeholder: "search",
    type: "search",
  }),
  class: "chats-container",
  chats: chatsArray,
  generalLink: new GeneralLink({
    text: "Profile",
    class: "profile-link-container",
    href: "../../pages/profile/profile.pug",
  }),
  avatarHeader: new Avatar({
    avatarURL: mockChats[0].avatarURL,
  }),
  userName: mockChats[0].display_name,
  messagesList: new MessagesList({
    timeHeader: mockChats[0].time,
    messages: messagesArray,
  }),
  inputFooter: new ChatPageInput({
    class: "input-wrapper",
    type: "text",
    placeholder: "message",
    name: "message",
  }),
});

render(".main", chats);
setTimeout(() => {
  chats.children.chatPageInput.setProps({
    placeholder: "search",
  });
}, 1000);
