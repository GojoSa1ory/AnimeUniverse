namespace RSPOCourseWork.Dtos;

public class GetCollectionDto
{
    public int Id { get; set; }
    public string CollectionName { get; set; }
    public string CollectionImage { get; set; }
    public List<AnimeDto>? Anime { get; set; }
}