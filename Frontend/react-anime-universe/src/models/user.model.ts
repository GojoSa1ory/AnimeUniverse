import { IAnime } from "./anime.models"

export type IUser = {
    id: number
    username: string
    email: string
    image: string
    collection: UserCollection[]
    createdAt: Date
    updatedAt: Date
}

type UserCollection = {
    id: number
    title: string
    user: IUser
    anime: IAnime[];
    createdAt: Date
    updatedAt: Date
}