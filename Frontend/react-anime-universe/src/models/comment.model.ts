import { IUser } from "./user.model";

export class CommentModel {
    constructor (
        public id: number,
        public name: string,
        public text: string,
        public createdAt: string,
        public updatedAt: string,
        public user: IUser
    ) {}
}

export class SetCommentModel {
    constructor (
        public name: string,
        public text: string,
        public createdAt?: string,
        public updatedAt?: string,
    ) {}
}