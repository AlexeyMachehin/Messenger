import {GeneralInput} from "../../components/generalInput/GeneralInput";
import {ChangeData} from "../../pages/changeData/ChangeData";
import {ChangePassword} from "../../pages/changePassword/ChangePassword";
import { Chats } from "../../pages/chats/Chats";
import { AsidePanel } from "../../pages/chats/components/asidePanel/AsidePanel";
import { ChatPanel } from "../../pages/chats/components/chatPanel/CHatPanel";
import {Login} from "../../pages/login/Login";
import {Registration} from "../../pages/registration/Registration";

type IThis = Login | Registration | AsidePanel | ChatPanel | Chats | ChangePassword | ChangeData ;

export function onSubmitForm<T extends {}>(this: IThis): T {
  /** Event of submit. */
  const event = arguments[0];
  /** Class name form. */
  const className = arguments[1];

  event.preventDefault();
  const form = this.element?.querySelector(className) as HTMLFormElement;
  if (form != null) {
    const fields = Array.from(form).filter(
      (el) => el.nodeName === "INPUT"
    ) as HTMLInputElement[];
    const result = fields.reduce(
      (a, v) => ({ ...a, [v.name]: v.value }),
      {}
    ) as T;
    form.reset();
    return result;
  }
  return {} as T;
}

export function checkInputValue(this: GeneralInput) {
  /** HTML input element. */
  const element = arguments[0];
  /** Event of input/focus/blur. */
  const event = arguments[1];

  if (!element.validity.valid) {
    this.setProps({
      isValid: false,
    });
  } else {
    this.setProps({
      isValid: true,
    });
  }
  if (event.type === "input" || event.type === "focus") {
    element.focus();
  }
}
