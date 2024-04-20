using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace RSPOCourseWork.Controllers;

[ApiController]
[Route("[controller]")]
public class CommentController : ControllerBase
{

    private readonly ICommnetService service;

    public CommentController(ICommnetService service)
    {
        this.service = service;
    }

    [HttpPost("create/{animeId}")]
    public async Task<ActionResult<ServiceResponse<GetCommentDto>>> CreateComment(SetCommentDto newComment, string animeId)
    {

        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        var response = await service.CreateComment(newComment, userId, animeId);

        if (!response.Success) return BadRequest(response);

        return Ok(response);
    }

    [HttpGet("get/animeId")]
    public async Task<ActionResult<ServiceResponse<List<GetCommentDto>>>> GetComments(string animeId)
    {
        var response = await service.GetCommentsByAnime(animeId);

        if (!response.Success) return BadRequest(response);

        return Ok(response);
    }

    [HttpPatch("update/animeId/commentId")]
    public async Task<ActionResult<ServiceResponse<GetCommentDto>>> UpdateComment(SetCommentDto newComment, string animeId, int commentId)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        var response = await service.UpdateComment(newComment, userId, animeId, commentId);

        if (!response.Success) return BadRequest(response);

        return Ok(response);
    }

    [HttpDelete("delete/commentId")]
    public async Task<ActionResult<ServiceResponse<string>>> DeleteComment(int commentId)
    {

        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        var response = await this.service.DeleteComment(userId, commentId);

        if (!response.Success) return BadRequest(response);

        return Ok(response);
    }
}
