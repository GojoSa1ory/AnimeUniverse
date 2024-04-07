namespace RSPOCourseWork.Services.AnimeService;

public interface IAnimeService
{
    Task<ServiceResponse<List<AnimeModel>>> ParseShit();
    Task<ServiceResponse<List<AnimeModel>>> GetAll();
    Task<ServiceResponse<AnimeModel>> GetById(string id);
}