import { UserDto } from "./user";
export interface ChatDto {
  readonly id: number;
  readonly title: string;
  readonly avatar: string;
  readonly unread_count: number;
  readonly last_message: {
    user: UserDto;
    time: string;
    content: string;
  } | null;
}
