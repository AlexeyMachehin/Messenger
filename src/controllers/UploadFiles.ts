import { UploadFilesAPI } from '../api/UploadFiles';
import { storeCurrentUser } from '../store/StoreCurrentUser';

const uploadFilesAPI = new UploadFilesAPI;

export class UploadFiles {
    async uploadAvatar(data: FormData) {
        try {
            const response = await uploadFilesAPI.uploadAvatar(data);
            storeCurrentUser.setUser(response);
        } catch (error) {
            alert(`Server error: ${(error as any).reason}. Try again`);
        }
    }
}