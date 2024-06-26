namespace RSPOCourseWork.Services.AnimeService;

public interface IAnimeService
{
    Task<ServiceResponse<List<AnimeModel>>> ParseShit();
    Task<ServiceResponse<List<AnimeModel>>> GetAll();
    Task<ServiceResponse<List<AnimeDto>>> Search(string request);
    Task<ServiceResponse<AnimeModel>> GetById(string id);
    Task<ServiceResponse<List<AnimeModel>>> AnimePagination(int page, int pageSize);
    Task<ServiceResponse<List<AnimeModel>>> SortAnime(string sortMethod, int page, int pageSize);
}
