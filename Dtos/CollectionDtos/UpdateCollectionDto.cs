namespace RSPOCourseWork.Dtos;

public class UpdateCollectionDto
{
    public string? CollectionName { get; set; }
    public IFormFile? CollectionImage { get; set; }
    public int? AnimeId { get; set; }
}
