export interface UserDto {
  readonly id: number;
  readonly first_name: string | null;
  readonly second_name: string | null;
  readonly display_name: string | null;
  readonly login: string | null;
  readonly email: string | null;
  readonly phone: string | null;
  readonly avatar: string | null;
}
