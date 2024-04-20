import { AnimeDto } from "./anime.models";

export class CollectionDto {
    constructor(
        public id: number,
        public collectionName: string,
        public collectionImage: string,
        public anime: AnimeDto[],
    ) {}
}

export class SetCollectionDto {
    constructor(
        public CollectionName: string,
        public AnimeId?: string,
        public CollectionImage?: string,
    ) {}
}
