export type AnimeResponse = {
    data: AnimeDto[];
    success: boolean;
    message: string;
};

export type OneAnimeResponse = {
    data: AnimeDto;
    success: boolean;
    message: string;
};

export type AnimeDto = {
    id: string;
    type: string;
    links: LinksDto;
    attributes: AttributesDto;
};

export type AttributesDto = {
    id: number;
    createdAt: string;
    updatedAt: string;
    slug: string;
    synopsis: string;
    description: string;
    coverImageTopOffset: number;
    titles: TitlesDto;
    canonicalTitle: string;
    averageRating: string;
    userCount: number;
    favoritesCount: number;
    startDate: string;
    endDate: string;
    nextRelease: string;
    popularityRank: string;
    ratingRank: number;
    ageRating: string;
    ageRatingGuide: string;
    subtype: string;
    status: string;
    tba: string;
    posterImage: PosterImageDto;
    coverImage: CoverImageDto;
    episodeCount: number;
    episodeLength: string;
    totalLength: string | number;
    youtubeVideoId: string;
    showType: string;
    nsfw: boolean;
};

export type LinksDto = {
    id: number;
    self: string;
    related: string;
    first: string;
    next: string;
    last: string;
};

export type TitlesDto = {
    id: number;
    en: string;
    en_jp: string;
    ja_jp: string;
};

export type PosterImageDto = {
    id: number;
    tiny: string;
    large: string;
    small: string;
    medium: string;
    original: string;
};

export type CoverImageDto = {
    id: number;
    tiny: string;
    large: string;
    small: string;
    original: string;
};
