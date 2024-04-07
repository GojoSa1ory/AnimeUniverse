using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RSPOCourseWork.Models;
namespace RSPOCourseWork.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService service;

    public UserController (IUserService service)
    {
        this.service = service;
    }

    [HttpGet("all")]
    public async Task<ActionResult<ServiceResponse<List<GetUserDto>>>> GetUsers()
    {
        var response = await this.service.GetAl();
    
        return Ok(response);
    }

    [HttpGet("one/{id}")]
    public async Task<ActionResult<ServiceResponse<GetUserDto>>> GetById(int id)
    {
        var response = await this.service.GetOne(id);

        if (!response.Success) return NotFound(response);
        
        return Ok(response);
    }

    [HttpDelete("delete/{id}")]
    public async Task<ActionResult<ServiceResponse<string>>> RemoveUser(int id)
    {
        var response = await this.service.GetOne(id);

        if (!response.Success) return NotFound(response);
        
        return Ok(response);
    }
}