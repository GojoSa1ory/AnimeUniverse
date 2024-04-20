using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RSPOCourseWork.Controllers;

[ApiController]
[Route("[controller]")]
public class FileUploadController : ControllerBase
{

    private readonly IUploadService _service;

    public FileUploadController(IUploadService service)
    {
        _service = service;
    }

    [HttpPatch("picture/user/set")]
    [Authorize(Roles = "admin, user")]
    public async Task<ActionResult<ServiceResponse<GetUserDto>>> UpdateProfilePicture([FromForm] UpdateUserDto newUser)
    {

        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        var response = await _service.UpdateProfilePicture(newUser, userId);

        if (!response.Success) return BadRequest(response);

        return Ok(response);
    }

    [HttpGet("picture/get")]
    public async Task<IActionResult> GetImage(string path)
    {
        string filePath = $"./{path}";

        if (!System.IO.File.Exists(filePath))
        {
            return NotFound("File not found");
        }

        byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);

        string contentType = "application/octet-stream";

        string fileName = Path.GetFileName(filePath);

        return File(fileBytes, contentType, fileName);
    }
}
