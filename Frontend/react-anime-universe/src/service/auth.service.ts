import { AxiosResponse } from "axios";
import { $api, $apiUpdateInfo } from "../api";
import { AuthResponse, IAuthUser } from "../models/auth.model";
import { ILoginUser } from "../models/user.model";

export default class AuthService {
    static async registerUser(
        user: IAuthUser,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/user", user);
    }

    static async loginUser(
        user: ILoginUser,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("auth/login", user);
    }

    static async checkAuth() {
        return $api.get("user/profile");
    }

    static async getUser(id: string | number) {
        return $api.get(`user/one/${id}`);
    }

    static async updateUserInfo(username: string | undefined, user: any) {
        return $api.patch(`user/${username}`, user);
    }

    static async updatePassword(username: string | undefined, user: any) {
        return $api.patch(`user/${username}/password`, user);
    }

    static async updateUser(username: string | undefined, user: any) {
        return $apiUpdateInfo.patch(`user/${username}`, user);
    }

    static async deleteUser(username: string | undefined) {
        return $api.delete(`user/${username}`);
    }
}
