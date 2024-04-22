using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RSPOCourseWork.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAnimeModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "youtubeVideoId",
                table: "AttributesModel",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "youtubeVideoId",
                table: "AttributesModel",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
