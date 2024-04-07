using System.ComponentModel.DataAnnotations;

namespace RSPOCourseWork.Dtos;

public class SetUserDto
{
    public string Name {get; set;}
    
    [EmailAddress(ErrorMessage = "Email style is invalid")]
    public string Email {get; set;}
    
    public string ProfileImage {get; set;}
    
    [MinLength(8, ErrorMessage = "Pasword length must be more then 8")]
    public string Password { get; set; }
}