using RSPOCourseWork.Models;

namespace RSPOCourseWork.Services;

public interface IUserService
{
    Task<ServiceResponse<List<GetUserDto>>> GetAl();
    Task<ServiceResponse<GetUserDto>> CreateUser(SetUserDto newUser);
    Task<ServiceResponse<GetUserDto>> GetOne(int id);
    Task<ServiceResponse<string>> Remove(int id);
    Task<ServiceResponse<GetUserDto>> Profile(int id);
    Task<ServiceResponse<GetUserDto>> UpdateUser(UpdateUserDto newUser, int id);
}
