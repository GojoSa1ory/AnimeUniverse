import axios, { AxiosResponse } from "axios";
import { ServerResponse } from "../models/serverResponse.models";
import { AnimeDto } from "../models/anime.models";

export default class AnimeService {
    private static base_url = "http://localhost:5054";

    static async getFixedAnime(): Promise<
        AxiosResponse<ServerResponse<AnimeDto[]>>
    > {
        return axios.get<ServerResponse<AnimeDto[]>>(`${this.base_url}/all`);
    }

    static getAnimeById(
        id: string | undefined,
    ): Promise<AxiosResponse<ServerResponse<AnimeDto>>> {
        return axios.get<ServerResponse<AnimeDto>>(
            `${this.base_url}/one/${id}`,
        );
    }

    static searchAnime(
        request: string,
    ): Promise<AxiosResponse<ServerResponse<AnimeDto[]>>> {
        return axios.get<ServerResponse<AnimeDto[]>>(
            `${this.base_url}/search/${request}`,
        );
    }

    static paginationAnime(
        page: number,
    ): Promise<AxiosResponse<ServerResponse<AnimeDto[]>>> {
        return axios.get<ServerResponse<AnimeDto[]>>(
            `${this.base_url}/page/${page}/10`,
        );
    }

    static filterAnime(
        filterMethod: string,
        page: number,
    ): Promise<AxiosResponse<ServerResponse<AnimeDto[]>>> {
        return axios.get<ServerResponse<AnimeDto[]>>(
            `${this.base_url}/filter/${filterMethod}/${page}/10`,
        );
    }
}
