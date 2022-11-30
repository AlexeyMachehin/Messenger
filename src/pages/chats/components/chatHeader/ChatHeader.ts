import { ManageChatModal } from './../../../../components/ManageChatModal/ManageChatModal';
import { ManageUserModal } from './../../../../components/ManageUserModal/ManageUserModal';
import { chatHeaderTemplate } from './chatHeaderTemplate';
import { Select } from "./../../../../components/Select/Select";
import { IconButton } from "./../../../../components/IconButton/IconButton";
import { Avatar } from "./../../../../components/Avatar/Avatar";
import { Block } from "./../../../../utils/Block";
import { CommonProps } from "./../../../../utils/models/props";
import { SelectItem } from "../../../../components/selectItem/SelectItem";
import { chats as mockChats } from "../../../../utils/mockData";
import { openSelect } from "../../../../utils/openSelect";
import { openDialog } from "../../../../utils/openDialog";
import { GeneralInput } from '../../../../components/generalInput/GeneralInput';
import { Input } from '../../../../components/input/Input';
import { GeneralButton } from '../../../../components/generalButton/GeneralButton';
import "./chatHeader.scss"

type ChatHeaderType = {
  avatarHeader: Avatar;
  selectHeader: Select;
  manageUserButton: IconButton;
  deleteUserDialog: ManageUserModal;
  addUserDialog: ManageUserModal;
  manageChatModal: ManageChatModal;
} & CommonProps;

export class ChatHeader extends Block<ChatHeaderType> {
  constructor() {
    super("div", {
      class: ["chat__header"],

      avatarHeader: new Avatar({
        avatarURL: mockChats[0].avatarURL,
        class: ["avatar-container"],
        classImg: "avatar-container_avatar",
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
      manageUserButton: new IconButton({
        class: ["manage-user__button"],
        events: {
          click: (event) =>
            openSelect.apply<ChatHeader, [Event, string], void>(this, [
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
                openDialog.apply<ChatHeader, [string], void>(this, [
                  "addUserDialog",
                ]),
            },
          }),
          new SelectItem({
            text: "Delete user",
            classIcon: "delete-icon",
            events: {
              click: () =>
                openDialog.apply<ChatHeader, [string], void>(this, [
                  "deleteUserDialog",
                ]),
            },
          }),
          new SelectItem({
            text: "Delete chat",
            classIcon: "delete-icon",
            events: {
              click: () =>
                openDialog.apply<ChatHeader, [string], void>(this, [
                  "manageChatModal",
                ]),
            },
          }),
        ],
      }),
    });
  }
  render(): DocumentFragment {
    return this.compile(chatHeaderTemplate, this.props);
  }
}

