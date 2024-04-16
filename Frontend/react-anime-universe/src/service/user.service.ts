import { AxiosResponse } from "axios";
import { $api, $apiUpdateInfo } from "../api";
import { ISetUser, IUser } from "../models/user.model";
import { ServerResponse } from "../models/serverResponse.models";

export class UserService {
    static async getUser(
        id: string | number,
    ): Promise<AxiosResponse<ServerResponse<IUser>>> {
        return $api.get<ServerResponse<IUser>>(`user/one/${id}`);
    }

    static async updateUserInfo(
        user: ISetUser,
    ): Promise<AxiosResponse<ServerResponse<IUser>>> {
        return $api.patch<ServerResponse<IUser>>(`user/update`, user);
    }

    static async deleteUser(username: string | undefined) {
        return $api.delete(`user/${username}`);
    }

    static async updateImage(user: ISetUser) {
        return $apiUpdateInfo.patch(`FileUpload/picture/user/set/`, user);
    }
}
