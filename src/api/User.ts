import { UserDto } from '../utils/dto/user';
import { HTTPTransport } from '../utils/HttpTransport';

export class UserAPI extends HTTPTransport {
    getUser(): Promise<UserDto> {
        return this.get<UserDto>("auth/user");
    }

    getUserById(id: number): Promise<UserDto> {
        return this.get<UserDto>(`user/${id}`);
    }

    changeUserData(data: UserDto) {
        return this.put("/user/profile", { data: JSON.stringify(data) });
    }
}