import { IAnime } from "./anime.models"

export type IUserCollection = {
    anime: IAnime[],
    createdAt: string,
    updatedAt: string,
    title: string,
    id: number
}

export type IUserCollectionResponse = {
    data: IUserCollection[]
}

