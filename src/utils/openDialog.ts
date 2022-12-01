import { ChatHeader } from "./../pages/chats/components/chatHeader/ChatHeader";
import { ManageUserModal } from "./../components/ManageUserModal/ManageUserModal";

type IThis = ChatHeader;

export function openDialog(this: IThis) {
  /** Event of click. */
  const indexOfEvent = 0;
  (
    this.children[arguments[indexOfEvent]] as ManageUserModal
  ).service?.openDialog();
}
