using System.ComponentModel.DataAnnotations;

namespace RSPOCourseWork.Dtos;

public class GetUserDto
{
    public int Id {get; set;}
    public string Name {get; set;}
    [EmailAddress(ErrorMessage = "Ur email is invalid")]
    public string Email {get; set;}
    public string ProfileImage {get; set;}
}

