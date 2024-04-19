using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace RSPOCourseWork.Services.AuthService;

public class AuthService : IAuthService
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(IMapper mapper, AppDbContext context, IConfiguration configuration)
    {
        _mapper = mapper;
        _context = context;
        _configuration = configuration;
    }

    public async Task<ServiceResponse<AuthDto>> Register(SetUserDto user)
    {
        ServiceResponse<AuthDto> response = new();

        try
        {
            if (IsUserExist(user.Name)) throw new Exception("User with this name is already exist");

            var newUser = _mapper.Map<UserModel>(user);
            newUser.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            newUser.Role = _context.Roles.FirstOrDefault(r => r.Id == 2);

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            string token = CreateToken(newUser);

            AuthDto authDto = new AuthDto
            {
                token = token,
                user = _mapper.Map<GetUserDto>(newUser)
            };

            response.Data = authDto;

        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
        }

        return response;
    }

    public async Task<ServiceResponse<AuthDto>> Login(SetAuthUser user)
    {
        ServiceResponse<AuthDto> response = new();

        try
        {
            if (!IsUserExist(user.Name)) throw new Exception("User not found");

            UserModel dBUser = _context.Users
            .Include(r => r.Role)
            .FirstOrDefault(u => u.Name == user.Name);

            if (!BCrypt.Net.BCrypt.Verify(user.Password, dBUser.Password))
                throw new Exception("Password is invalid");

            string token = CreateToken(dBUser);
            AuthDto authDto = new AuthDto
            {
                user = _mapper.Map<GetUserDto>(dBUser),
                token = token
            };

            response.Data = authDto;

        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
        }

        return response;
    }

    private bool IsUserExist(string name)
    {
        var user = _context.Users.FirstOrDefault(u => u.Name == name);

        if (user is not null) return true;

        return false;
    }

    private string CreateToken(UserModel user)
    {
        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role.Name)
    };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("Auth:KEY").Value!));
        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var jwt = new JwtSecurityToken(
            issuer: _configuration.GetSection("Auth:ISSUER").Value,
            audience: _configuration.GetSection("Auth:AUDIENCE").Value,
            claims: claims,
            expires: DateTime.UtcNow.Add(TimeSpan.FromDays(1)),
            signingCredentials: cred
        );

        return new JwtSecurityTokenHandler().WriteToken(jwt);
    }
}
