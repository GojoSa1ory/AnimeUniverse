using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace RSPOCourseWork.Services.CollectionService;

public class CollectionService : ICollectionService
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;

    public CollectionService(IMapper mapper, AppDbContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<ServiceResponse<string>> DeleteAnimeFromCollection(int collectionId, string animeId, int userId)
    {
        ServiceResponse<string> response = new();

        try
        {

            var collection = _context.Collections
            .Include(c => c.user)
            .Include(c => c.anime)
            .FirstOrDefault(c => c.Id == collectionId && c.user.Id == userId);

            if (collection is null) throw new Exception("Collection not found");

            var anime = collection.anime.FirstOrDefault(a => a.Id == animeId);

            if (anime is null) throw new Exception("Anime not found");

            collection.anime.Remove(anime);

            await _context.SaveChangesAsync();

            response.Data = "done";


        }
        catch (Exception ex)
        {
            response.Message = ex.Message;
            response.Success = false;
        }


        return response;
    }

    public async Task<ServiceResponse<GetCollectionDto>> CreateCollection(SetCollectionDto newAnime, string userId)
    {
        ServiceResponse<GetCollectionDto> response = new();

        try
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == int.Parse(userId));
            var anime = _context.Anime.FirstOrDefault(a => a.Id == newAnime.AnimeId.ToString());

            var collection = _mapper.Map<CollectionModel>(newAnime);
            collection.user = user;
            collection.anime = new List<AnimeModel>();
            collection.anime.Add(anime);
            _context.Collections.Add(collection);
            await _context.SaveChangesAsync();

            response.Data = _mapper.Map<GetCollectionDto>(collection);
        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<GetCollectionDto>> GetById(int id, int userID)
    {
        ServiceResponse<GetCollectionDto> response = new();

        try
        {
            CollectionModel collection = _context.Collections
                .Include(c => c.anime)
                    .ThenInclude(a => a.attributes)
                .Include(c => c.anime)
                    .ThenInclude(a => a.attributes.posterImage)
                .Include(c => c.anime)
                    .ThenInclude(a => a.attributes.titles)
                .FirstOrDefault(c => c.Id == id && c.user.Id == userID);

            if (collection is null) throw new Exception("Collection not found");

            response.Data = _mapper.Map<GetCollectionDto>(collection);
        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
        }


        return response;
    }

    public async Task<ServiceResponse<GetCollectionDto>> AddAnimeToCollection(int collectionId, string animeId, int userId)
    {

        ServiceResponse<GetCollectionDto> response = new();

        try
        {

            CollectionModel collection = _context.Collections.FirstOrDefault(c => c.Id == collectionId && c.user.Id == userId);

            if (collection is null) throw new Exception("Collection not found");

            AnimeModel anime = _context.Anime.FirstOrDefault(a => a.Id == animeId);

            if (anime is null) throw new Exception("Anime not found");

            collection.anime = new List<AnimeModel>() { anime };

            await _context.SaveChangesAsync();

            response.Data = _mapper.Map<GetCollectionDto>(collection);

        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
        }

        return response;

    }

    public async Task<ServiceResponse<List<GetCollectionDto>>> GetAll(int userId)
    {
        ServiceResponse<List<GetCollectionDto>> response = new ServiceResponse<List<GetCollectionDto>>();

        try
        {

            var collections = _context.Collections.Where(c => c.user.Id == userId);

            if (collections.IsNullOrEmpty()) throw new Exception("U don't have a collections");

            response.Data = collections.Select(c => _mapper.Map<GetCollectionDto>(c)).ToList();

        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<GetCollectionDto>> UpdateCollectionInfo(UpdateCollectionDto collectionDto, int collectionId, int userId)
    {
        ServiceResponse<GetCollectionDto> response = new();

        try
        {
            var collection = _context.Collections.FirstOrDefault(c => c.Id == collectionId && c.user.Id == userId);

            if (collection is null) throw new Exception("Collection not found");

            var imageFile = collectionDto.CollectionImage;

            if (imageFile is not null)
            {
                var uploadImagePath = $"./Uploads/CollectionImage";
                string fullImagePath = $"{uploadImagePath}/{imageFile.FileName}";

                using (var fileStream = new FileStream(fullImagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(fileStream);
                }

                var baseUrl = "http://localhost:5054/FileUpload/picture/get?path=";
                var imageRelativePath = $"Uploads/CollectionImage/{imageFile.FileName}";
                var imageUri = new Uri(baseUrl + imageRelativePath);

                collection.CollectionImage = imageUri.ToString();
            }

            collection.CollectionName = collectionDto.CollectionName;

            await _context.SaveChangesAsync();

            response.Data = _mapper.Map<GetCollectionDto>(collection);
        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<string>> Remove(int id, int userId)
    {
        ServiceResponse<string> response = new();

        try
        {
            var collection = _context.Collections.FirstOrDefault(c => c.Id == id && c.user.Id == userId);

            if (collection is null) throw new Exception("Collection not found");

            _context.Collections.Remove(collection);

            await _context.SaveChangesAsync();

            response.Data = "Delete success";
        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
        }

        return response;
    }
}
