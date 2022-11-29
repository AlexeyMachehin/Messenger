import { ChatDto } from "../utils/dto/chat";
import { HTTPTransport } from "../utils/HttpTransport";

export class ChatsAPI extends HTTPTransport {
  getChats(): Promise<ChatDto[]> {
    return this.get<ChatDto[]>("/chats");
  }
  findChat(value: string): Promise<ChatDto[]> {
    return this.get<ChatDto[]>("/chats", { data: { title: value } });
  }
  createChat(data: { title: string }): Promise<void> {
    return this.post<void>("/chats", { data: JSON.stringify(data) });
  }
}
