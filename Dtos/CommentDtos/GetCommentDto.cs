namespace RSPOCourseWork.Dtos;

public class GetCommentDto
{
    public int Id { get; set; }
    public string Text { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public GetUserDto User { get; set; }
    public AnimeDto Anime { get; set; }
}
