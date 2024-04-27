namespace RSPOCourseWork.Services.CollectionService;

public interface ICollectionService
{
    Task<ServiceResponse<GetCollectionDto>> CreateCollection(SetCollectionDto newAnime, string userId);
    Task<ServiceResponse<string>> DeleteAnimeFromCollection(int collectionId, string animeId, int userId);
    Task<ServiceResponse<GetCollectionDto>> AddAnimeToCollection(int collectionId, string animeId, int userId);
    Task<ServiceResponse<GetCollectionDto>> UpdateCollectionInfo(UpdateCollectionDto collectionDto, int collectionId, int userId);
    Task<ServiceResponse<GetCollectionDto>> GetById(int id, int userId);
    Task<ServiceResponse<string>> Remove(int id, int userId);
    Task<ServiceResponse<List<GetCollectionDto>>> GetAll(int userId);
}
