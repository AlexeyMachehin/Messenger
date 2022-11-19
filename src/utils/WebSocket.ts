import HTTPTransport from "../utils/httpTransport";

export class Connection extends HTTPTransport {
  connect(): any {
    return this.post<any>(`chats/token/2410`, {
      data: { mode: "cors", credentials: "include" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("token", data.token); // Получаем строку
      });
  }
}
export const connection = new Connection();
