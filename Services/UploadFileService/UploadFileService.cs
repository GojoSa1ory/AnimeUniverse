
using AutoMapper;

namespace RSPOCourseWork.Services;

public class UploadFileService : IUploadService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public UploadFileService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ServiceResponse<GetUserDto>> UpdateProfilePicture(UpdateUserDto newUser, int id)
    {
        ServiceResponse<GetUserDto> response = new();

        try
        {

            UserModel user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user is null) throw new Exception("User not found");

            var imageFile = newUser.ProfileImage;

            if (imageFile is null) throw new Exception("Image not found");

            var uploadImagePath = $"./Uploads/UserImage";
            string fullImagePath = $"{uploadImagePath}/{imageFile.FileName}";

            using (var fileStream = new FileStream(fullImagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            var baseUrl = "http://localhost:5054/FileUpload/picture/get?path=";
            var imageRelativePath = $"Uploads/UserImage/{imageFile.FileName}";
            var imageUri = new Uri(baseUrl + imageRelativePath);

            user.ProfileImage = imageUri.ToString();

            await _context.SaveChangesAsync();
            response.Data = _mapper.Map<GetUserDto>(user);

        }
        catch (Exception ex)
        {
            response.Message = ex.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<GetCollectionDto>> UpdateCollectionPicture(UpdateCollectionDto dto, int id, int userId)
    {
        ServiceResponse<GetCollectionDto> response = new();

        try
        {

            CollectionModel collection = _context.Collections.FirstOrDefault(c => c.Id == id && c.user.Id == userId);

            if (collection is null) throw new Exception("Collectio not found");

            var imageFile = dto.CollectionImage;

            if (imageFile is null) throw new Exception("Image not found");

            var uploadImagePath = $"./Uploads/CollectionImage";
            string fullImagePath = $"{uploadImagePath}/{imageFile.FileName}";

            using (var fileStream = new FileStream(fullImagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            var baseUrl = "http://localhost:5054/FileUpload/picture/get?path=";
            var imageRelativePath = $"Uploads/UserImage/{imageFile.FileName}";
            var imageUri = new Uri(baseUrl + imageRelativePath);

            var result = new GetCollectionDto
            {
                CollectionName = "sdfs",
                Id = 1,
                CollectionImage = imageUri.ToString()
            };

            response.Data = result;

        }
        catch (Exception ex)
        {
            response.Message = ex.Message;
            response.Success = false;
        }

        return response;

    }


}
