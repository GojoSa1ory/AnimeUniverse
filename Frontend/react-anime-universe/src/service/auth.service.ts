import { $api, $apiUpdateInfo } from "../api";
import { AuthLogin, AuthResponse, IAuthUser } from "../models/auth.model";

export default class AuthService {

    static async registerUser (user:IAuthUser) {
        return $api.post<AuthResponse>('/user', user)
    }

    static async loginUser (user: IAuthUser) {
        return $api.post<AuthLogin>('auth/login', user)
    }

    static async checkAuth () {
        return $api.get('auth/profile')
    }

    static async getUser (username: string) {
        return $api.get(`user/${username}`)
    }

    static async updateUserInfo (username: string | undefined, user: any) {
        return $api.patch(`user/${username}`, user)
    }

    static async updatePassword (username: string | undefined, user: any) {
        return $api.patch(`user/${username}/password`, user)
    }

    static async updateUser (username: string | undefined, user: any) {
        return $apiUpdateInfo.patch(`user/${username}`, user)
    }

    static async deleteUser (username: string | undefined) {
        return $api.delete(`user/${username}`)
    }

}