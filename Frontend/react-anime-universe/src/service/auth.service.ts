import { AxiosResponse } from "axios";
import { $api } from "../api";
import { AuthResponse, IAuthUser } from "../models/auth.model";
import { ILoginUser } from "../models/user.model";
import { ServerResponse } from "../models/serverResponse.models";

export default class AuthService {
    static async registerUser(
        user: IAuthUser,
    ): Promise<AxiosResponse<ServerResponse<AuthResponse>>> {
        return $api.post<ServerResponse<AuthResponse>>("/Auth/register", user);
    }

    static async loginUser(
        user: ILoginUser,
    ): Promise<AxiosResponse<ServerResponse<AuthResponse>>> {
        return $api.post<ServerResponse<AuthResponse>>("auth/login", user);
    }

    static async checkAuth() {
        return $api.get("user/profile");
    }
}
