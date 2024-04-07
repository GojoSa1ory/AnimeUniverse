using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RSPOCourseWork.Services.CollectionService;

namespace RSPOCourseWork.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class CollectionController: ControllerBase
{
    private readonly ICollectionService _service;
    public CollectionController (ICollectionService service)
    {
        _service = service;
    }

    [HttpPost("create")]
    public async Task<ActionResult<ServiceResponse<GetCollectionDto>>> CreateCollection(SetCollectionDto collection)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        var response = await _service.CreateCollection(collection, userId);

        if (!response.Success) return BadRequest(response);
        
        return response;
    }
    
    [HttpGet("one/{id}")]
    public async Task<ActionResult<ServiceResponse<GetCollectionDto>>> GEtCollection(int id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        var response = await _service.GetById(id, int.Parse(userId));

        if (!response.Success) return BadRequest(response);
        
        return response;
    }

    [HttpGet("all")]
    public async Task<ActionResult<ServiceResponse<List<GetCollectionDto>>>> GetAllCollections()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        var response = await _service.GetAll(int.Parse(userId));

        if (!response.Success) return BadRequest(response);
        
        return response;
    }

    [HttpPost("{collectionId}/add-anime/{animeId}")]
    public async Task<ActionResult<ServiceResponse<GetCollectionDto>>> AddAnimeToCollectiom(int collectionId, string animeId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        var response = await _service.AddAnimeToCollection(collectionId, animeId, int.Parse(userId));

        if (!response.Success) return BadRequest(response);
        
        return response;
    }

    [HttpPatch("update/{collectionId}")]
    public async Task<ActionResult<ServiceResponse<GetCollectionDto>>> UpdateCollectionInfo(SetCollectionDto collectionDto, int collectionId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        var response = await _service.UpdateCollectionInfo(collectionDto, collectionId, int.Parse(userId));

        if (!response.Success) return BadRequest(response);
        
        return response;
    }

    [HttpDelete("delete/{collectionId}")]
    public async Task<ActionResult<ServiceResponse<string>>> DeleteCollection(int collectionId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        var response = await _service.Remove(collectionId, int.Parse(userId));

        if (!response.Success) return BadRequest(response);
        
        return response;
    }
}