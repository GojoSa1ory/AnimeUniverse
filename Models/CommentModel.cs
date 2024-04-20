namespace RSPOCourseWork.Models;

public class CommentModel
{
    public int Id { get; set; }
    public string Text { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public UserModel User { get; set; }
    public AnimeModel? Anime { get; set; }
}
