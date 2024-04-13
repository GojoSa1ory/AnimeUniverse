namespace RSPOCourseWork.Data;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<UserModel> Users { get; set; }
    public DbSet<AnimeModel> Anime { get; set; }
    public DbSet<CollectionModel> Collections { get; set; }
    public DbSet<CommentModel> Comments { get; set; }
}
