using Microsoft.AspNetCore.Mvc;
using RSPOCourseWork.Services.AuthService;

namespace RSPOCourseWork.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _service;
    private readonly AppDbContext _context;

    public AuthController(IAuthService service, AppDbContext context)
    {
        _service = service;
        _context = context;
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
