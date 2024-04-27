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
        public CollectionImage?: FormDataEntryValue | null,
        public CollectionName?: string,
        public AnimeId?: number,
    ) {}
}
