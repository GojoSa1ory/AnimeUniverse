using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RSPOCourseWork.Models;
using System.Security.Claims;
namespace RSPOCourseWork.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService service;

    public UserController(IUserService service)
    {
        this.service = service;
    }

    [HttpGet("all")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<ServiceResponse<List<GetUserDto>>>> GetUsers()
    {
        var response = await this.service.GetAl();

        if (!response.Success) return BadRequest(response);

        return Ok(response);
    }

    [HttpGet("one/{id}")]
    public async Task<ActionResult<ServiceResponse<GetUserDto>>> GetById(int id)
    {
        var response = await this.service.GetOne(id);

        if (!response.Success) return NotFound(response);

        return Ok(response);
    }

    [HttpGet("profile")]
    public async Task<ActionResult<ServiceResponse<GetUserDto>>> Profile()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var response = await this.service.Profile(int.Parse(userId));

        if (!response.Success) return NotFound(response);

        return Ok(response);
    }

    [HttpDelete("delete")]
    public async Task<ActionResult<ServiceResponse<string>>> RemoveUser()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

        var response = await this.service.GetOne(userId);

        if (!response.Success) return NotFound(response);

        return Ok(response);
    }

    [HttpPatch("update")]
    public async Task<ActionResult<ServiceResponse<GetUserDto>>> UpdateUser(UpdateUserDto user)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

        var response = await service.UpdateUser(user, userId);

        if (!response.Success) return BadRequest(response);

        return Ok(response);
    }
}
