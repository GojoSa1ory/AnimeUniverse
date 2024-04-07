using Microsoft.EntityFrameworkCore;

namespace RSPOCourseWork.Models;

public class UserModel {
    public int Id {get; set;}
    public string Name {get; set;}
    public string Email {get; set;}
    public string ProfileImage {get; set;}
    public string Password { get; set; }
    public List<CollectionModel>? collections { get; set; }
}