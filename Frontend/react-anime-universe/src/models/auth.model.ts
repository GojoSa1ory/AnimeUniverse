import { IUser } from "./user.model";

export interface IAuthUser {
    username: string;
    email?: string;
    password: string;
}

// export type AuthResponse = {
//     token: string;
//     user: IUser;
// };

export interface AuthLogin extends IUser {
    token: string;
}

export type AuthResponse = {
    data: {
        user: IUser;
        token: string;
    };
    success: boolean;
    message: string;
};
