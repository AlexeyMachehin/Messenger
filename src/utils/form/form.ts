import {GeneralInput} from "../../components/generalInput/GeneralInput";
import {ChangeData} from "../../pages/changeData/ChangeData";
import {ChangePassword} from "../../pages/changePassword/ChangePassword";
import {Chats} from "../../pages/chats/Chats";
import {Login} from "../../pages/login/Login";
import {Registration} from "../../pages/registration/Registration";

type IThis = Login | Registration | Chats | ChangePassword | ChangeData;

export function onSubmitForm<T extends {}>(this: IThis): T {
  const event = arguments[0];
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
  const element = arguments[0];
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
