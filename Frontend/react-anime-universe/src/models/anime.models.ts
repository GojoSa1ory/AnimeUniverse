export class AnimeDto {
    public id: string;
    public type: string;
    public links: LinksDto;
    public attributes: AttributesDto;

    constructor(
        id: string,
        type: string,
        links: LinksDto,
        attributes: AttributesDto,
    ) {
        this.id = id;
        this.type = type;
        this.links = links;
        this.attributes = attributes;
    }
}

export class AttributesDto {
    constructor(
        public id: number,
        public createdAt: string,
        public updatedAt: string,
        public slug: string,
        public synopsis: string,
        public description: string,
        public coverImageTopOffset: number,
        public titles: TitlesDto,
        public canonicalTitle: string,
        public averageRating: string,
        public userCount: number,
        public favoritesCount: number,
        public startDate: string,
        public endDate: string,
        public nextRelease: string,
        public popularityRank: string,
        public ratingRank: number,
        public ageRating: string,
        public ageRatingGuide: string,
        public subtype: string,
        public status: string,
        public tba: string,
        public posterImage: PosterImageDto,
        public coverImage: CoverImageDto,
        public episodeCount: number,
        public episodeLength: string,
        public totalLength: string | number,
        public youtubeVideoId: string,
        public showType: string,
        public nsfw: boolean,
    ) {}
}

export class LinksDto {
    constructor(
        public id: number,
        public self: string,
        public related: string,
        public first: string,
        public next: string,
        public last: string,
    ) {}
}

export class TitlesDto {
    constructor(
        public id: number,
        public en: string,
        public en_jp: string,
        public ja_jp: string,
    ) {}
}

export class PosterImageDto {
    constructor(
        public id: number,
        public tiny: string,
        public large: string,
        public small: string,
        public medium: string,
        public original: string,
    ) {}
}

export class CoverImageDto {
    constructor(
        public id: number,
        public tiny: string,
        public large: string,
        public small: string,
        public original: string,
    ) {}
}
