import { ChatDto } from "./../utils/dto/chat-dto";
import HTTPTransport from "../utils/httpTransport";

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

export default new ChatsAPI();
