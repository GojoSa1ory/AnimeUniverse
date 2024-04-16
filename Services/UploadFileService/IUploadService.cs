namespace RSPOCourseWork.Services;

public interface IUploadService
{
    Task<ServiceResponse<GetUserDto>> UpdateProfilePicture(UpdateUserDto newUser, int id);
    Task<ServiceResponse<GetCollectionDto>> UpdateCollectionPicture(UpdateCollectionDto dto, int id, int userId);
}
