namespace RSPOCourseWork.Dtos;

public class AnimeDto
{
    public string Id { get; set; }
    public string Type { get; set; }
    public LinksDto Links { get; set; }
    public AttributesDto Attributes { get; set; }
}

public class AttributesDto
{
    public int Id { get; set; }
    public DateTime createdAt { get; set; }
    public DateTime updatedAt { get; set; }
    public string slug { get; set; }
    public string synopsis { get; set; }
    public string description { get; set; }
    public int coverImageTopOffset { get; set; }
    public TitlesModel titles { get; set; }
    public string canonicalTitle { get; set; }
    public List<string> abbreviatedTitles { get; set; }
    public string averageRating { get; set; }
    public int userCount { get; set; }
    public int favoritesCount { get; set; }
    public string startDate { get; set; }
    public string endDate { get; set; }
    public string? nextRelease { get; set; }
    public int popularityRank { get; set; }
    public int ratingRank { get; set; }
    public string? ageRating { get; set; }
    public string? ageRatingGuide { get; set; }
    public string subtype { get; set; }
    public string status { get; set; }
    public string? tba { get; set; }
    public PosterImageDto posterImage { get; set; }
    public CoverImageDto coverImage { get; set; }
    public int? episodeCount { get; set; }
    public string? episodeLength { get; set; }
    public int? totalLength { get; set; }
    public string youtubeVideoId { get; set; }
    public string showType { get; set; }
    public bool nsfw { get; set; }
}

public class LinksDto
{
    public int Id { get; set; }
    public string? self { get; set; }
    public string? related { get; set; }
    public string? first { get; set; }
    public string? next { get; set; }
    public string? last { get; set; }
}

public class TitlesDto
{
    public int Id { get; set; }
    public string? en { get; set; }
    public string? en_jp { get; set; }
    public string? ja_jp { get; set; }
}

public class PosterImageDto
{
    public int Id { get; set; }
    public string tiny { get; set; }
    public string large { get; set; }
    public string small { get; set; }
    public string medium { get; set; }
    public string original { get; set; }
}

public class CoverImageDto
{
    public int Id { get; set; }
    public string tiny { get; set; }
    public string large { get; set; }
    public string small { get; set; }
    public string original { get; set; }
}