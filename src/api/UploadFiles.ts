import { UserDto } from '../utils/dto/user';
import { HTTPTransport } from '../utils/HttpTransport';

export class UploadFilesAPI extends HTTPTransport {
    async uploadAvatar(avatar: FormData) {
        return await this.put<UserDto>("/user/profile/avatar", {
            data: avatar,
            headers: {
                "X-XSS-Protection": "1; mode=block",
            }
        });
    }
}