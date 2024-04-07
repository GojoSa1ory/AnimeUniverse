import axios from "axios"

export default class AnimeService {

    private static base_url = "http://localhost:3001/api"

    static async getFixedAnime (limit: number) {
        return axios.get(`${this.base_url}/anime/limit/${limit}`)
    }

    static getAnimeById (id: string | undefined) {
        return axios.get(`${this.base_url}/anime/${id}`)
    }

}