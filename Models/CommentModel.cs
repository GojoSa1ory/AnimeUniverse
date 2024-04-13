namespace RSPOCourseWork.Models;

public class CommentModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Text { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public UserModel User { get; set; }
    public List<AnimeModel> Anime { get; set; }
}
