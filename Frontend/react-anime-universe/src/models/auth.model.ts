import { IUser } from "./user.model"

export interface IAuthUser {
    username: string,
    email?: string,
    password: string
}

export type AuthResponse = {
    token: string,
    user: IUser
}

export interface AuthLogin extends IUser {
    token:string
}
