import { ChatPanel } from "./../pages/chats/components/chatPanel/ChatPanel";
import { ChatHeader } from "./../pages/chats/components/chatHeader/ChatHeader";
import { Select } from "./../components/Select/Select";

type IThis = ChatHeader | ChatPanel;

export function openSelect(this: IThis): void {
  /** Event of click. */
  const indexOfEvent = 0;
  /** Component Select. */
  const indexOfSelect = 1;

  (this.children[arguments[indexOfSelect]] as Select).service?.open();
  (arguments[indexOfEvent] as PointerEvent).stopPropagation();
}
