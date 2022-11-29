import { Block } from "../../../../utils/Block";
import { asidePanelTemplate } from "./asidePanelTemplate";
import { Chat } from "../../../../components/chat/Chat";
import { GeneralButton } from "../../../../components/generalButton/GeneralButton";
import { GeneralLink } from "../../../../components/generalLink/GeneralLink";
import { ChatPageInput } from "../../../../components/chatPageInput/ChatPageInput";
import { Avatar } from "../../../../components/avatar/Avatar";
import { onSubmitForm } from "../../../../utils/form/form";
import { CommonProps } from "../../../../utils/models/props";
import { ROUTES } from "../../../../utils/router/routes";
import { ChatDto } from "../../../../utils/dto/chat";
import { storeChat, StoreChatEvents } from "../../../../store/StoreChat";
import { ChatsController } from "../../../../controllers/Chats";
import { router } from "../../../../index";
import './asidePanel.scss';

type AsidePanelType = {
  createChatButton: GeneralButton;
  searchChat: ChatPageInput;
  chats: Chat[];
  generalLink: GeneralLink;
  createChatInput: ChatPageInput;
  getSelectedChat: () => number | null;
} & CommonProps;

const chatsController = new ChatsController();
const DEFAULT_AVATAR_URL =
  "https://avatars.mds.yandex.net/i?id=90a14aacfb5159c04fc902bad5bbd095-5232129-images-thumbs&n=13&exp=1";

export class AsidePanel extends Block<AsidePanelType> {
  constructor() {
    super("aside", {
      class: ["chats"],
      createChatInput: new ChatPageInput({
        name: "title",
        type: "text",
        placeholder: "Enter name of new chat",
      }),
      createChatButton: new GeneralButton({
        buttonText: "Create new chat",
        events: {
          click: (event) => {
            const values = onSubmitForm.apply<
              AsidePanel,
              [Event, string],
              { title: string }
            >(this, [event, ".create-chat-form"]);
            chatsController.createChat(values);
          },
        },
      }),
      searchChat: new ChatPageInput({
        class: ["input-wrapper"],
        placeholder: "Search chat",
        type: "search",
        events: {
          change: (event) =>
            chatsController.findChat((event.target as HTMLInputElement).value),
        },
      }),
      chats: [],
      generalLink: new GeneralLink({
        text: "Profile",
        class: ["profile-link-container"],
        events: {
          click: () => router.go(ROUTES.Profile),
        },
      }),
      getSelectedChat: () => {
        const param = router.getParams();
        if (param != null && param.chatId) {
          return param.chatId;
        }
        return false;
      },
    });

    this.subscribeToChangeChats();
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
            avatarURL: chat.avatar ?? DEFAULT_AVATAR_URL,
            class: ["avatar-container"],
            classImg: "avatar-container_avatar",
          }),
          id: chat.id,
          events: {
            click: () => {
              const chatId = chat.id;
              storeChat.setSelectedChat(chat);
              router.go(ROUTES.ChatById(chatId), { chatId });
            },
          },
        });
        return chatInstance;
      });
      this.setProps({ chats });
    });
  }

  render(): DocumentFragment {
    return this.compile(asidePanelTemplate, this.props);
  }
}
