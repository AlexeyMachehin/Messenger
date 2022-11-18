import { ChatDto } from './../utils/dto/chat-dto';
import HTTPTransport from "../utils/httpTransport";

export class ChatsAPI extends HTTPTransport {
  getChats(): Promise<ChatDto[]> {
    return this.get<ChatDto[]>("/chats");
  }
}

export default new ChatsAPI();
