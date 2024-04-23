import { IUser } from "./user.model";

export interface IAuthUser {
    name: string;
    profileImage: string;
    email?: string;
    password: string;
}

export type AuthResponse = {
    user: IUser;
    token: string;
};
