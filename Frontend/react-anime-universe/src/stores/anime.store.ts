import { IAnime } from "@/models/anime.models";
import { create } from "zustand";

type IUseAnime = {
    anime: IAnime[] | [],
    oneAnime: IAnime | null,

    setAnime(anime: IAnime[]): void,
    setOneAnime(anime: IAnime): void,
    removeAnime(): void,
    removeOneAnime(): void,
}

export const useAnime = create<IUseAnime>((set => ({
    anime: [],
    oneAnime: null,

    setAnime(anime) {
        set({anime: anime})
    },

    setOneAnime(anime) {
        set({oneAnime: anime})
    },

    removeAnime() {
        set({anime: []})
    },

    removeOneAnime() {
        set({oneAnime: null})
    }
})))