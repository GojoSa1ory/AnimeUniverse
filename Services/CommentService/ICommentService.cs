namespace RSPOCourseWork.Services;

public interface ICommnetService
{
    Task<ServiceResponse<List<GetCommentDto>>> GetAllComments();
    Task<ServiceResponse<List<GetCommentDto>>> GetCommentsByAnime(string animeId);
    Task<ServiceResponse<GetCommentDto>> CreateComment(SetCommentDto newComment, int userId, string animeId);
    Task<ServiceResponse<GetCommentDto>> UpdateComment(SetCommentDto newComment, int userId, string animeId, int commentId);
}
