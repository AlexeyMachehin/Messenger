import { UserDto } from "./dto/user";
import { getUserInfo } from "./getUserInfo";

export function getUserResources<T extends keyof UserDto>(
  value: T
): NonNullable<UserDto[T]> | string {
  return new URL(
    "resources" + getUserInfo(value),
    process.env.YANDEX_PRAKTIKUM_API
  ).toString();
}
