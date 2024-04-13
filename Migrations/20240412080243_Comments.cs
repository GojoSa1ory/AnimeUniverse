using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RSPOCourseWork.Migrations
{
    /// <inheritdoc />
    public partial class Comments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ageRatingGuide",
                table: "AttributesModel");

            migrationBuilder.DropColumn(
                name: "favoritesCount",
                table: "AttributesModel");

            migrationBuilder.DropColumn(
                name: "nextRelease",
                table: "AttributesModel");

            migrationBuilder.DropColumn(
                name: "slug",
                table: "AttributesModel");

            migrationBuilder.DropColumn(
                name: "synopsis",
                table: "AttributesModel");

            migrationBuilder.DropColumn(
                name: "tba",
                table: "AttributesModel");

            migrationBuilder.CreateTable(
                name: "CommentModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentModel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommentModel_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                        name: "FK_AnimeModelCommentModel_CommentModel_commentsId",
                        column: x => x.commentsId,
                        principalTable: "CommentModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnimeModelCommentModel_commentsId",
                table: "AnimeModelCommentModel",
                column: "commentsId");

            migrationBuilder.CreateIndex(
                name: "IX_CommentModel_UserId",
                table: "CommentModel",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnimeModelCommentModel");

            migrationBuilder.DropTable(
                name: "CommentModel");

            migrationBuilder.AddColumn<string>(
                name: "ageRatingGuide",
                table: "AttributesModel",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "favoritesCount",
                table: "AttributesModel",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "nextRelease",
                table: "AttributesModel",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "slug",
                table: "AttributesModel",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "synopsis",
                table: "AttributesModel",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "tba",
                table: "AttributesModel",
                type: "text",
                nullable: true);
        }
    }
}
