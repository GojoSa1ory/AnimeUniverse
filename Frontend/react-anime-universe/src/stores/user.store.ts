import { create } from "zustand";
import { IUser } from "../models/user.model";

type IUseUser = {
    user: IUser | null;
    isAuth: boolean,
    setUser(user: IUser): void,
    removeUser(): void,
}

export const useUser = create<IUseUser>((set => ({
    user: null,
    isAuth:false,

    setUser (user) {
        set({
            user: user,
            isAuth: true 
        })
    },

    removeUser () {
        localStorage.removeItem('token')
        set({
            user: null,
            isAuth: false
        })
    }
}))) 