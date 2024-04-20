using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RSPOCourseWork.Migrations
{
    /// <inheritdoc />
    public partial class ReworkCommentModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnimeModelCommentModel");

            migrationBuilder.AddColumn<string>(
                name: "AnimeId",
                table: "Comments",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Comments_AnimeId",
                table: "Comments",
                column: "AnimeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Anime_AnimeId",
                table: "Comments",
                column: "AnimeId",
                principalTable: "Anime",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Anime_AnimeId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Comments_AnimeId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "AnimeId",
                table: "Comments");

            migrationBuilder.CreateTable(
                name: "AnimeModelCommentModel",
                columns: table => new
                {
                    AnimeId = table.Column<string>(type: "text", nullable: false),
                    commentsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnimeModelCommentModel", x => new { x.AnimeId, x.commentsId });
                    table.ForeignKey(
                        name: "FK_AnimeModelCommentModel_Anime_AnimeId",
                        column: x => x.AnimeId,
                        principalTable: "Anime",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AnimeModelCommentModel_Comments_commentsId",
                        column: x => x.commentsId,
                        principalTable: "Comments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnimeModelCommentModel_commentsId",
                table: "AnimeModelCommentModel",
                column: "commentsId");
        }
    }
}
