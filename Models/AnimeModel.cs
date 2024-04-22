namespace RSPOCourseWork.Models;

public class AnimeModel
{
    public string Id { get; set; }
    public string type { get; set; }
    public LinksModel links { get; set; }
    public AttributesModel attributes { get; set; }
    public List<CollectionModel>? collections { get; set; }
    public List<CommentModel>? comments { get; set; }
}

public class AttributesModel
{
    public int Id { get; set; }
    public DateTime createdAt { get; set; }
    public DateTime updatedAt { get; set; }
    public string description { get; set; }
    public int coverImageTopOffset { get; set; }
    public TitlesModel titles { get; set; }
    public string canonicalTitle { get; set; }
    public List<string> abbreviatedTitles { get; set; }
    public string averageRating { get; set; }
    public int userCount { get; set; }
    public string startDate { get; set; }
    public string endDate { get; set; }
    public int popularityRank { get; set; }
    public int ratingRank { get; set; }
    public string? ageRating { get; set; }
    public string subtype { get; set; }
    public string status { get; set; }
    public PosterImageModel posterImage { get; set; }
    public CoverImageModel coverImage { get; set; }
    public int? episodeCount { get; set; }
    public string? episodeLength { get; set; }
    public int? totalLength { get; set; }
    public string? youtubeVideoId { get; set; }
    public string showType { get; set; }
    public bool nsfw { get; set; }
}

public class LinksModel
{
    public int Id { get; set; }
    public string? self { get; set; }
    public string? related { get; set; }
    public string? first { get; set; }
    public string? next { get; set; }
    public string? last { get; set; }
}

public class TitlesModel
{
    public int Id { get; set; }
    public string? en { get; set; }
    public string? en_jp { get; set; }
    public string? ja_jp { get; set; }
}

public class PosterImageModel
{
    public int Id { get; set; }
    public string tiny { get; set; }
    public string large { get; set; }
    public string small { get; set; }
    public string medium { get; set; }
    public string original { get; set; }
}

public class CoverImageModel
{
    public int Id { get; set; }
    public string tiny { get; set; }
    public string large { get; set; }
    public string small { get; set; }
    public string original { get; set; }
}
