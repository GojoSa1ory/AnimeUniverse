using AutoMapper;
using RSPOCourseWork.Models;

namespace RSPOCourseWork.Services;

public class UserService : IUserService
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;

    public UserService(IMapper mapper, AppDbContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<ServiceResponse<GetUserDto>> Profile(int id)
    {
        ServiceResponse<GetUserDto> response = new();

        try
        {

            UserModel user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user is null) throw new Exception("User not found");

            response.Data = _mapper.Map<GetUserDto>(user);

        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<List<GetUserDto>>> GetAl()
    {
        ServiceResponse<List<GetUserDto>> response = new();

        try
        {
            var users = _context.Users;

            if (users is null) throw new Exception("No users");

            response.Data = users.Select(u => _mapper.Map<GetUserDto>(u)).ToList();

        }
        catch (Exception ex)
        {
            response.Message = ex.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<GetUserDto>> CreateUser(SetUserDto newUser)
    {
        ServiceResponse<GetUserDto> response = new();

        try
        {
            var user = _mapper.Map<UserModel>(newUser);

            Console.WriteLine(CheckUser(user));
            if (CheckUser(user)) throw new Exception("This user already exist");

            user.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            response.Data = _mapper.Map<GetUserDto>(user);
        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<GetUserDto>> GetOne(int id)
    {
        ServiceResponse<GetUserDto> response = new();

        try
        {

            UserModel user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user is null) throw new Exception("User not found");

            response.Data = _mapper.Map<GetUserDto>(user);

        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<string>> Remove(int id)
    {
        ServiceResponse<string> response = new();

        try
        {

            UserModel user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user is null) throw new Exception("User not found");

            _context.Users.Remove(user);

            response.Data = "User delete success";
        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<GetUserDto>> UpdateUser(UpdateUserDto newUser, int id)
    {
        var response = new ServiceResponse<GetUserDto>();

        try
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user is null) throw new Exception("User not found");

            user.Name = newUser?.Name is not null ? newUser.Name : user.Name; ;
            user.Email = newUser?.Email is not null ? newUser.Email : user.Email;

            if (newUser?.Password is not null)
                if (!BCrypt.Net.BCrypt.Verify(newUser?.Password, user.Password))
                    user.Password = BCrypt.Net.BCrypt.HashPassword(newUser?.Password);

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

    private bool CheckUser(UserModel user)
    {
        var userFromDb = _context.Users.FirstOrDefault(u => u.Name == user.Name);

        if (userFromDb is null) return false;

        return true;
    }
}
