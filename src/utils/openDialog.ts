import { ManageUserModal } from "../components/manageUserModal/ManageUserModal";
import { ChatHeader } from "./../pages/chats/components/chatHeader/ChatHeader";


type IThis = ChatHeader;

export function openDialog(this: IThis) {
  /** Event of click. */
  const indexOfEvent = 0;
  (
    this.children[arguments[indexOfEvent]] as ManageUserModal
  ).service?.openDialog();
}
