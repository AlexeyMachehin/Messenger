import { store } from "../store/store";
import HTTPTransport from "../utils/httpTransport";

export class ConnectionAPI extends HTTPTransport {
  async connect(id: number): Promise<string> {
    const response = await this.post<{ token: string }>(`chats/token/${id}`, {
      headers: { mode: "cors", credentials: "include" },
    });
    store.set("token", response.token);
    return response.token;
  }
}

