namespace RSPOCourseWork.Models;

public class RoleModel
{
    public string Admin { get; } = "admin";
    public string DefaultUser { get; } = "defaultUser";
    public UserModel user { get; set; }
}
