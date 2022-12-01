import { UserDto } from '../utils/dto/user';
import { HTTPTransport } from '../utils/HttpTransport';

export class UserAPI extends HTTPTransport {
    changeUserData(data: UserDto) {
        return this.put("/user/profile", { data: JSON.stringify(data) });
    }
}