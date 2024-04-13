import axios, { AxiosResponse } from "axios";
import { ServerResponse } from "../models/serverResponse.models";
import { AnimeDto } from "../models/anime.models";
import { CommentModel, SetCommentModel } from "../models/comment.model";
import { $api } from "../api";

export default class AnimeService {
    // private static base_url = "http://localhost:3001/api"
    private static base_url = "http://localhost:5054";

    static async getFixedAnime(): Promise<AxiosResponse<ServerResponse<AnimeDto[]>>> {
        // return axios.get(`${this.base_url}/anime/limit/${limit}`)
        return axios.get<ServerResponse<AnimeDto[]>>(`${this.base_url}/all`);
    }

    static getAnimeById(id: string | undefined): Promise<AxiosResponse<ServerResponse<AnimeDto>>> {
        return axios.get<ServerResponse<AnimeDto>>(`${this.base_url}/one/${id}`);
    }
    
    static getComments(id: string | undefined): Promise<AxiosResponse<ServerResponse<CommentModel[]>>> {
        return axios.get<ServerResponse<CommentModel[]>>(`${this.base_url}/Comment/get/animeId?animeId=${id}`)
    }

    static sendComment(id: string | undefined, comment: SetCommentModel) {
        return $api.post(`${this.base_url}/Comment/create/${id}`, comment)
    }
}
