import GeneralInput from "../../components/generalInput/generalInput";
import ChangeData from "../../pages/changeData/changeData";
import ChangePassword from "../../pages/changePassword/changePassword";
import Chats from "../../pages/chats/chats";
import Login from "../../pages/login/login";
import Registration from "../../pages/registration/registration";

type IThis = Login | Registration | Chats | ChangePassword | ChangeData;

export function onSubmitForm<T extends {}>(this: IThis): T {
  arguments[0].preventDefault();
  const form = this.element?.querySelector("form");
  // if (form != null) {
  //   const fields = Array.from(form).filter(
  //     (el) => el.nodeName === "INPUT"
  //   ) as HTMLInputElement[];
  //   return (fields.reduce((a, v) => ({ ...a, [v.name]: v.value }), {})) as T;

  // }
  // return {} as T;

  if (form != null) {
    const fields = Array.from(form).filter(
      (el) => el.nodeName === "INPUT"
    ) as HTMLInputElement[];
    // const token = store.getState().token;
    // const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/137864/2410/${token}`);
    // socket.addEventListener('open', () => {
    //   console.log('Соединение установлено');

    //   socket.send(JSON.stringify({
    //     content: 'Моё первое сообщение миру!',
    //     type: 'message',
    //   }));

    //   socket.send(JSON.stringify({
    //     content: 0,
    //     type: 'get old',
    //   }));
    // });
    // socket.addEventListener('message', event => {
    //   console.log('Получены данные', event.data);
    // });
    // console.log(socket)
    console.log(fields.reduce((a, v) => ({ ...a, [v.name]: v.value }), {}));
    const result = fields.reduce((a, v) => ({ ...a, [v.name]: v.value }), {}) as T;
    form.reset()
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
