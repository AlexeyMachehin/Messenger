import GeneralInput from "../../components/generalInput/generalInput";
import ChangeData from "../../pages/changeData/changeData";
import ChangePassword from "../../pages/changePassword/changePassword";
import { Chats } from "../../pages/chats/chats";
import Login from "../../pages/login/login";
import Registration from "../../pages/registration/registration";

type IThis = Login | Registration | Chats | ChangePassword | ChangeData;

export function onSubmitForm(this: IThis) {
  arguments[0].preventDefault();
  const form = this.element?.querySelector("form");
  if (form != null) {
    const fields = Array.from(form).filter(
      (el) => el.nodeName === "INPUT"
    ) as HTMLInputElement[];
    console.log(fields.reduce((a, v) => ({ ...a, [v.name]: v.value }), {}));
  }
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
