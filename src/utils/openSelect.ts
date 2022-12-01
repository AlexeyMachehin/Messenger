import { Select } from '../components/select/Select';
import { ChatFooter } from '../pages/chats/chatFooter/ChatFooter';
import { ChatHeader } from '../pages/chats/components/chatHeader/ChatHeader';
import { ChatPanel } from '../pages/chats/components/chatPanel/ChatPanel';


type IThis = ChatHeader | ChatPanel | ChatFooter;

export function openSelect(this: IThis): void {
  /** Event of click. */
  const indexOfEvent = 0;
  /** Component Select. */
  const indexOfSelect = 1;

  (this.children[arguments[indexOfSelect]] as Select).service?.open();
  (arguments[indexOfEvent] as PointerEvent).stopPropagation();
}
