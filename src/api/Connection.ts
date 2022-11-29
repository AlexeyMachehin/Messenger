import { store } from "../store/Store";
import HTTPTransport from "../utils/HttpTransport";

export class ConnectionAPI extends HTTPTransport {
  async connect(id: number): Promise<string> {
    const response = await this.post<{ token: string }>(`chats/token/${id}`, {
      headers: { mode: "cors", credentials: "include" },
    });
    store.set("token", response.token);
    return response.token;
  }
}

