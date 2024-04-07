using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Mvc;
using RSPOCourseWork.Services.AnimeService;

namespace RSPOCourseWork.Controllers;

[ApiController]
public class AnimeController : ControllerBase
{
    private readonly IAnimeService _service;

    public AnimeController (IAnimeService service)
    {
        _service = service;
    }

    [HttpGet("parse")]
    public async Task<ActionResult<ServiceResponse<List<AnimeModel>>>> Parse()
    {
        var response = await _service.ParseShit();

        if (!response.Success) return BadRequest(response);

        return response;
    }

    [HttpGet("all")]
    public async Task<ActionResult<ServiceResponse<List<AnimeModel>>>> GetAll()
    {
        var response = await _service.GetAll();

        if (!response.Success) return BadRequest(response);

        return response;
    }

    [HttpGet("one/{id}")]
    public async Task<ActionResult<ServiceResponse<AnimeModel>>> GetOne(string id)
    {
        var response = await _service.GetById(id);

        if (!response.Success) return NotFound(response);
        
        return response;
    }
}