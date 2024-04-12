import { $api } from "../api";
import { IUserCollectionResponse } from "../models/collections.model";

export default class CollectionsService {
    static async getAllCollections(): Promise<IUserCollectionResponse> {
        return $api.get("/user-collections");
    }

    static async createCollection(collection: { title: string }) {
        return $api.post("/user-collections", collection);
    }

    static async addAnimeToCollection(
        collectionId: string,
        animeId: number | undefined | string,
    ) {
        return $api.post(
            `/user-collections/${collectionId}/add-anime/${animeId}`,
        );
    }

    static async getCollectionById(id: string | undefined) {
        return $api.get(`/user-collections/${id}`);
    }
}
