export type IUser = {
    id: number;
    name: string;
    email: string;
    profileImage: string;
};

export type ISetUser = {
    id?: number;
    name?: string;
    email?: string;
    profileImage?: FormDataEntryValue | null;
    password?: string;
};

export type ILoginUser = {
    name: string;
    password: string;
};
