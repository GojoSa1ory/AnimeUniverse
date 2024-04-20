namespace RSPOCourseWork.Services;

public interface ICommnetService
{
    Task<ServiceResponse<List<GetCommentDto>>> GetAllComments();
    Task<ServiceResponse<List<GetCommentDto>>> GetCommentsByAnime(string animeId);
    Task<ServiceResponse<GetCommentDto>> CreateComment(SetCommentDto newComment, int userId, string animeId);
    Task<ServiceResponse<string>> DeleteComment(int userId, int commentId);
    Task<ServiceResponse<List<GetCommentDto>>> UpdateComment(SetCommentDto newComment, int userId, string animeId, int commentId);
}
