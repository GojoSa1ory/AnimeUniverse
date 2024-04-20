import { AnimeDto } from "./anime.models";
import { IUser } from "./user.model";

export class CommentModel {
    constructor(
        public id: number,
        public name: string,
        public text: string,
        public createdAt: string,
        public updatedAt: string,
        public user: IUser,
        public anime: AnimeDto,
    ) {}
}

export class SetCommentModel {
    constructor(
        public name: string,
        public text: string,
        public createdAt?: string,
        public updatedAt?: string,
    ) {}
}
