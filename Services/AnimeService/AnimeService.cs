using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace RSPOCourseWork.Services.AnimeService;

public class AnimeService : IAnimeService
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;
    private readonly HttpClient _client = new();

    public AnimeService(IMapper _mapper, AppDbContext context)
    {
        this._mapper = _mapper;
        _context = context;
    }

    public async Task<ServiceResponse<List<AnimeDto>>> Search(string request)
    {

        ServiceResponse<List<AnimeDto>> response = new();

        try
        {

            var animeList = _context.Anime
            .Include(a => a.attributes)
            .Include(a => a.attributes.posterImage)
            .Include(a => a.attributes.titles)
            .Where(a => a.attributes.canonicalTitle.ToLower().Contains(request.ToLower()) || a.attributes.titles.en.ToLower().Contains(request.ToLower()) || a.attributes.titles.en_jp.ToLower().Contains(request.ToLower()) || a.attributes.titles.ja_jp.ToLower().Contains(request.ToLower()));

            response.Data = animeList.Select(a => _mapper.Map<AnimeDto>(a)).ToList();

        }
        catch (Exception ex)
        {
            response.Message = ex.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<List<AnimeModel>>> ParseShit()
    {
        ServiceResponse<List<AnimeModel>> response = new();

        try
        {
            var responseJson = await _client.GetAsync("https://kitsu.io/api/edge/anime?filter[seasonYear]=2023&page[limit]=20");

            if (!responseJson.IsSuccessStatusCode)
                throw new Exception($"Failed to fetch anime data. Status code: {responseJson.StatusCode}");

            var json = await responseJson.Content.ReadAsStringAsync();
            var animeData = JsonConvert.DeserializeObject<Root>(json);

            if (animeData is null && animeData?.data is null && animeData?.data.Count == 0)
                throw new Exception("Deserialized anime data is null or empty.");

            var responseData = animeData.data.Select(a => _mapper.Map<AnimeModel>(a)).ToList();
            responseData.ForEach(a => _context.Anime.Add(a));
            await _context.SaveChangesAsync();
            response.Data = responseData;
        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<List<AnimeModel>>> GetAll()
    {
        ServiceResponse<List<AnimeModel>> response = new();

        try
        {
            var data = await _context.Anime
                .Include(a => a.attributes)
                .Include(a => a.attributes.titles)
                .Include(a => a.attributes.coverImage)
                .Include(a => a.attributes.posterImage)
                .Include(a => a.links)
                .ToListAsync();

            if (data is null) throw new Exception("Anime is empty");

            response.Data = data;
        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<AnimeModel>> GetById(string id)
    {
        ServiceResponse<AnimeModel> response = new();

        try
        {
            AnimeModel anime = _context.Anime
                .Include(a => a.attributes)
                .Include(a => a.attributes.titles)
                .Include(a => a.attributes.coverImage)
                .Include(a => a.attributes.posterImage)
                .Include(a => a.links)
                .FirstOrDefault(a => a.Id == id);

            if (anime is null) throw new Exception("Anime not found");

            response.Data = anime;
        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<List<AnimeModel>>> AnimePagination(int page, int pageSize)
    {
        ServiceResponse<List<AnimeModel>> response = new();

        try
        {

            var anime = _context.Anime
            .Include(a => a.attributes)
            .Include(a => a.attributes.coverImage)
            .Include(a => a.attributes.titles)
            .Include(a => a.attributes.posterImage)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

            response.Data = anime;
        }
        catch (Exception ex)
        {
            response.Message = ex.Message;
            response.Success = false;
        }

        return response;
    }
}
