import { AxiosResponse } from "axios";
import { $api } from "../api";
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
}
