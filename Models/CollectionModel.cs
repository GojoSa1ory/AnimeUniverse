namespace RSPOCourseWork.Models;

public class CollectionModel
{
    public int Id { get; set; }
    public string CollectionName { get; set; }
    public string CollectionImage { get; set; }
    public List<AnimeModel>? anime { get; set; }
    public UserModel user { get; set; }
}
