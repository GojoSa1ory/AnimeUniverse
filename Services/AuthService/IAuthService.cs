namespace RSPOCourseWork.Services.AuthService;

public interface IAuthService
{
    Task<ServiceResponse<AuthDto>> Register(SetUserDto user);
    Task<ServiceResponse<AuthDto>> Login(SetAuthUser user);
}
