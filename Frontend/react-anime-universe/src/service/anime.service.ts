import axios, { AxiosResponse } from "axios";
import { AnimeResponse, OneAnimeResponse } from "../models/anime.models";

export default class AnimeService {
    // private static base_url = "http://localhost:3001/api"
    private static base_url = "http://localhost:5054";

    static async getFixedAnime(): Promise<AxiosResponse<AnimeResponse>> {
        // return axios.get(`${this.base_url}/anime/limit/${limit}`)
        return axios.get<AnimeResponse>(`${this.base_url}/all`);
    }

    static getAnimeById(
        id: string | undefined,
    ): Promise<AxiosResponse<OneAnimeResponse>> {
        return axios.get<OneAnimeResponse>(`${this.base_url}/one/${id}`);
    }
}
