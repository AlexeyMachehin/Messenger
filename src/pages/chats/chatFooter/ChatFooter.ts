import { WebSocketService } from "./../../../utils/webSocket";
import { storeChat } from "./../../../store/StoreChat";
import { ChatPageInput } from "./../../../components/chatPageInput/ChatPageInput";
import { Select } from "./../../../components/select/Select";
import { IconButton } from "./../../../components/iconButton/IconButton";
import { chatFooterTemplate } from "./chatFooterTemplate";
import { Block } from "./../../../utils/Block";
import { CommonProps } from "./../../../utils/models/props";
import { openSelect } from "../../../utils/openSelect";
import { SelectItem } from "../../../components/selectItem/SelectItem";
import { onSubmitForm } from "../../../utils/form/form";
import "./chatFooter.scss"

type ChatFooterType = {
  manageFileButton: IconButton;
  selectFooter: Select;
  inputFooter: ChatPageInput;
  messageButton: IconButton;
} & CommonProps;

export class ChatFooter extends Block<ChatFooterType> {
  constructor(webSocket: WebSocketService) {
    super("div", {
      class: ["chat__footer"],
      manageFileButton: new IconButton({
        class: ["manage-file__button"],
        events: {
          click: (event) =>
            openSelect.apply<ChatFooter, [Event, string], void>(this, [
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
              ChatFooter,
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
    });
  }

  render(): DocumentFragment {
    return this.compile(chatFooterTemplate, this.props);
  }
}
