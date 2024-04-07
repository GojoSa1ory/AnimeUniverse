using System.ComponentModel.DataAnnotations;

namespace RSPOCourseWork.Dtos;

public class SetAuthUser
{
    public string Name { get; set; }
    [MinLength(8, ErrorMessage = "Password length must be more then 8")]
    public string Password { get; set; }
}