using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;

namespace RSPOCourseWork.Services;

public class CommentService : ICommnetService
{
    private readonly IMapper mapper;
    private readonly AppDbContext context;

    public CommentService(IMapper mapper, AppDbContext context)
    {
        this.mapper = mapper;
        this.context = context;
    }

    public Task<ServiceResponse<List<GetCommentDto>>> GetAllComments()
    {
        throw new NotImplementedException();
    }

    public async Task<ServiceResponse<GetCommentDto>> CreateComment(SetCommentDto newComment, int userId, string animeId)
    {

        ServiceResponse<GetCommentDto> response = new();

        try
        {
            UserModel user = FindUser(userId);

            AnimeModel anime = FindAnime(animeId);

            CommentModel comment = mapper.Map<CommentModel>(newComment);
            user.comments = new List<CommentModel>() { comment };
            anime.comments = new List<CommentModel>() { comment };

            await context.SaveChangesAsync();

            response.Data = mapper.Map<GetCommentDto>(newComment);
        }
        catch (Exception ex)
        {
            response.Message = ex.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<List<GetCommentDto>>> GetCommentsByAnime(string animeId)
    {
        var response = new ServiceResponse<List<GetCommentDto>>();

        try
        {
            var comments = context.Comments
            .Include(c => c.User)
            .Where(c => c.Anime.Any(a => a.Id == animeId));

            if (comments.IsNullOrEmpty()) throw new Exception("Comments not found");

            response.Data = comments.Select(c => mapper.Map<GetCommentDto>(c)).ToList();

        }
        catch (Exception ex)
        {
            response.Message = ex.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<GetCommentDto>> UpdateComment(SetCommentDto newComment, int userId, string animeId, int commentId)
    {

        ServiceResponse<GetCommentDto> response = new();

        try
        {
            var comment = context.Comments
                .Include(c => c.User)
                .FirstOrDefault(c => c.Id == commentId && c.User.Id == userId && c.Anime.Any(a => a.Id == animeId));

            if (comment is null) throw new Exception("Comment not found");

            comment.Name = newComment.Name;
            comment.Text = newComment.Text;
            comment.UpdatedAt = newComment.CreatedAt;

            await context.SaveChangesAsync();

            response.Data = mapper.Map<GetCommentDto>(comment);

        }
        catch (Exception ex)
        {
            response.Message = ex.Message;
            response.Success = false;
        }

        return response;
    }

    private UserModel FindUser(int userId)
    {
        UserModel user = context.Users.FirstOrDefault(u => u.Id == userId);

        if (user is null) throw new Exception("User not found");

        return user;
    }

    private AnimeModel FindAnime(string animeId)
    {
        AnimeModel anime = context.Anime.FirstOrDefault(a => a.Id == animeId);

        if (anime is null) throw new Exception("Anime not found");

        return anime;
    }
}
