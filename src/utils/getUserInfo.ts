import { storeCurrentUser } from "../store/StoreCurrentUser";
import { UserDto } from "./dto/user";

export function getUserInfo<T extends keyof UserDto>(
  value: T
): NonNullable<UserDto[T]> | string {
  const user = storeCurrentUser.getCurrentUser();
  if (user && user[value]) {
    const userInfo = user[value];
    if (userInfo) {
      return userInfo;
    }
  }
  return "";
}
