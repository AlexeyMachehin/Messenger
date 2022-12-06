
import "./chatHeader.scss";
import { ChatsController } from '../../../../controllers/Chats';
import { storeChat } from '../../../../store/StoreChat';
import { router } from '../../../../index';
import { ROUTES } from '../../../../utils/router/routes';
import { Avatar } from '../../../../components/avatar/Avatar';
import { GeneralButton } from '../../../../components/generalButton/GeneralButton';
import { GeneralInput } from '../../../../components/generalInput/GeneralInput';
import { IconButton } from '../../../../components/iconButton/IconButton';
import { Input } from '../../../../components/input/Input';
import { ManageChatModal } from '../../../../components/manageChatModal/ManageChatModal';
import { ManageUserModal } from '../../../../components/manageUserModal/ManageUserModal';
import { Select } from '../../../../components/select/Select';
import { SelectItem } from '../../../../components/selectItem/SelectItem';
import { Block } from '../../../../utils/Block';
import { CommonProps } from '../../../../utils/models/props';
import { openSelect } from '../../../../utils/openSelect';
import { chatHeaderTemplate } from './chatHeaderTemplate';
import { DEFAULT_AVATAR_URL } from '../../../../utils/constants';
import { openDialog } from '../../../../utils/openDialog';

type ChatHeaderType = {
  avatarHeader: Avatar;
  selectHeader: Select;
  manageUserButton: IconButton;
  deleteUserDialog: ManageUserModal;
  addUserDialog: ManageUserModal;
  manageChatModal: ManageChatModal;
} & CommonProps;

const chatsController = new ChatsController();
export class ChatHeader extends Block<ChatHeaderType> {
  constructor() {
    super("div", {
      class: ["chat__header"],

      avatarHeader: new Avatar({
        avatarURL: DEFAULT_AVATAR_URL,
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
          attr: {
            type: 'submit'
          }
        }),
        handleOnSubmit: () => {
          const chatId = storeChat.getSelectedChatId();
          if (chatId != null) {
            chatsController.deleteChat({ chatId })
              .then(() => {
                const dialog = this.children.manageChatModal;
                if (!Array.isArray(dialog)) {
                  (dialog as ManageChatModal).service?.closeDialog();
                }
                router.go(ROUTES.Chats);
                storeChat.setSelectedChat(null);
                storeChat.setSelectedChatId(null);
              });
          }
        }
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

