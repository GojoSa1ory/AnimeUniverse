global using RSPOCourseWork.Services;
global using RSPOCourseWork.Data;
global using RSPOCourseWork.Models;
global using RSPOCourseWork.Dtos;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using RSPOCourseWork.Services.AnimeService;
using RSPOCourseWork.Services.AuthService;
using RSPOCourseWork.Services.CollectionService;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
var key = config.GetSection("AUTH:KEY").Value;

//JWT AUTH
builder.Services.AddAuthorization();
builder.Services.AddCors();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = config.GetSection("Auth:ISSUER").Value,
            ValidateAudience = true,
            ValidAudience = config.GetSection("Auth:AUDIENCE").Value,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            ValidateIssuerSigningKey = true
        };
    });

//DB Setup
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetSection("AppSettings:DefaultConnection").Value));

//AutoMapper
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "JWT Authentication",
        Description = "Enter JWT Bearer token **_only_**",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer", // must be lower case
        BearerFormat = "JWT",
        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };
    options.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {securityScheme, new string[] { }}
    });
});

//Add services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAnimeService, AnimeService>();
builder.Services.AddScoped<ICollectionService, CollectionService>();
builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();
app.UseCors(b => b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
