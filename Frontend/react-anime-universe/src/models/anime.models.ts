export type IAnime = {

    id: number;

    description: string;

    titles: Titles;

    posterImage: IImage;

    showType: string;

    averageRating: string;

    userCount: number;

    startDate: string;

    endDate: string;

    ageRating: string;

    status: string;

    episodeCount: number;

    episodeLength: number;

    totalLength: number;

    youtubeVideoId: string;
}

type IImage =  {
    tiny: string;
    small: string;
    large: string;
    original: string;
}

type Titles = {
    en: string;
    en_jp: string;
    ja_jp: string;
}