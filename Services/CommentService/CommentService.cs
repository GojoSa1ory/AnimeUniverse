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

            var responseComment = mapper.Map<GetCommentDto>(newComment);
            responseComment.User = mapper.Map<GetUserDto>(user);


            response.Data = mapper.Map<GetCommentDto>(responseComment);
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
            .Include(c => c.Anime)
            .Where(c => c.Anime.Id == animeId);

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

    public async Task<ServiceResponse<List<GetCommentDto>>> UpdateComment(SetCommentDto newComment, int userId, string animeId, int commentId)
    {

        ServiceResponse<List<GetCommentDto>> response = new();

        try
        {
            var comment = context.Comments
                .Include(c => c.User)
                .FirstOrDefault(c => c.Id == commentId && c.User.Id == userId && c.Anime.Id == animeId);

            if (comment is null) throw new Exception("Comment not found");

            comment.Text = newComment.Text;
            comment.UpdatedAt = newComment.CreatedAt;

            await context.SaveChangesAsync();

            var comments = this.context.Comments
            .Include(c => c.User)
            .Include(c => c.Anime)
            .Where(c => c.Anime.Id == animeId);

            response.Data = comments.Select(c => this.mapper.Map<GetCommentDto>(c)).ToList();

        }
        catch (Exception ex)
        {
            response.Message = ex.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<string>> DeleteComment(int userId, int commentId)
    {
        ServiceResponse<string> response = new();

        try
        {

            var comment = this.context.Comments.FirstOrDefault(c => c.Id == commentId && c.User.Id == userId);

            if (comment is null) throw new Exception("Comment not found");

            this.context.Remove(comment);

            await this.context.SaveChangesAsync();

            response.Data = "success";
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
