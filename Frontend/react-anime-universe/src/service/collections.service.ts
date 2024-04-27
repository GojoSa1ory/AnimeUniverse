import { AxiosResponse } from "axios";
import { $api, $apiUpdateInfo } from "../api";
import { CollectionDto, SetCollectionDto } from "../models/collections.model";
import { ServerResponse } from "../models/serverResponse.models";

export default class CollectionsService {
    static async getAllCollections(): Promise<
        AxiosResponse<ServerResponse<CollectionDto[]>>
    > {
        return $api.get<ServerResponse<CollectionDto[]>>("/collection/all");
    }

    static async createCollection(collection: SetCollectionDto) {
        return $api.post("/collection/create/", collection);
    }

    static async addAnimeToCollection(
        collectionId: string,
        animeId: number | undefined | string,
    ) {
        return $api.post(`/collection/${collectionId}/add-anime/${animeId}`);
    }

    static async getCollectionById(
        id: string | undefined,
    ): Promise<AxiosResponse<ServerResponse<CollectionDto>>> {
        return $api.get(`/collection/one/${id}`);
    }

    static async updateCollection(
        id: string | undefined,
        newCollection: SetCollectionDto,
    ): Promise<AxiosResponse<ServerResponse<CollectionDto>>> {
        return $apiUpdateInfo.patch(`/collection/update/${id}`, newCollection);
    }

    static async deleteAnime(
        id: string | undefined,
        animeId: string,
    ): Promise<AxiosResponse<ServerResponse<string>>> {
        return $api.delete(`/collection/delete/anime/${id}/${animeId}`);
    }
}
