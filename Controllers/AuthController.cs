using Microsoft.AspNetCore.Mvc;
using RSPOCourseWork.Services.AuthService;

namespace RSPOCourseWork.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _service;
    
    public AuthController (IAuthService service)
    {
        _service = service;
    }

    [HttpPost("register")]
    public async Task<ActionResult<ServiceResponse<AuthDto>>> Register(SetUserDto user)
    {
        var response = await _service.Register(user);

        if (!response.Success) return BadRequest(response);
        
        return response;
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<ServiceResponse<AuthDto>>> Login(SetAuthUser user)
    {
        var response = await _service.Login(user);

        if (!response.Success) return BadRequest(response);
        
        return response;
    }
}