using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RSPOCourseWork.Migrations
{
    /// <inheritdoc />
    public partial class InitMig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CoverImageModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tiny = table.Column<string>(type: "text", nullable: false),
                    large = table.Column<string>(type: "text", nullable: false),
                    small = table.Column<string>(type: "text", nullable: false),
                    original = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoverImageModel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LinksModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    self = table.Column<string>(type: "text", nullable: true),
                    related = table.Column<string>(type: "text", nullable: true),
                    first = table.Column<string>(type: "text", nullable: true),
                    next = table.Column<string>(type: "text", nullable: true),
                    last = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LinksModel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PosterImageModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tiny = table.Column<string>(type: "text", nullable: false),
                    large = table.Column<string>(type: "text", nullable: false),
                    small = table.Column<string>(type: "text", nullable: false),
                    medium = table.Column<string>(type: "text", nullable: false),
                    original = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PosterImageModel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TitlesModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    en = table.Column<string>(type: "text", nullable: true),
                    enjp = table.Column<string>(name: "en_jp", type: "text", nullable: true),
                    jajp = table.Column<string>(name: "ja_jp", type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TitlesModel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    ProfileImage = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AttributesModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    createdAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    slug = table.Column<string>(type: "text", nullable: false),
                    synopsis = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    coverImageTopOffset = table.Column<int>(type: "integer", nullable: false),
                    titlesId = table.Column<int>(type: "integer", nullable: false),
                    canonicalTitle = table.Column<string>(type: "text", nullable: false),
                    abbreviatedTitles = table.Column<List<string>>(type: "text[]", nullable: false),
                    averageRating = table.Column<string>(type: "text", nullable: false),
                    userCount = table.Column<int>(type: "integer", nullable: false),
                    favoritesCount = table.Column<int>(type: "integer", nullable: false),
                    startDate = table.Column<string>(type: "text", nullable: false),
                    endDate = table.Column<string>(type: "text", nullable: false),
                    nextRelease = table.Column<string>(type: "text", nullable: true),
                    popularityRank = table.Column<int>(type: "integer", nullable: false),
                    ratingRank = table.Column<int>(type: "integer", nullable: false),
                    ageRating = table.Column<string>(type: "text", nullable: true),
                    ageRatingGuide = table.Column<string>(type: "text", nullable: true),
                    subtype = table.Column<string>(type: "text", nullable: false),
                    status = table.Column<string>(type: "text", nullable: false),
                    tba = table.Column<string>(type: "text", nullable: true),
                    posterImageId = table.Column<int>(type: "integer", nullable: false),
                    coverImageId = table.Column<int>(type: "integer", nullable: false),
                    episodeCount = table.Column<int>(type: "integer", nullable: true),
                    episodeLength = table.Column<string>(type: "text", nullable: true),
                    totalLength = table.Column<int>(type: "integer", nullable: true),
                    youtubeVideoId = table.Column<string>(type: "text", nullable: false),
                    showType = table.Column<string>(type: "text", nullable: false),
                    nsfw = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributesModel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttributesModel_CoverImageModel_coverImageId",
                        column: x => x.coverImageId,
                        principalTable: "CoverImageModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttributesModel_PosterImageModel_posterImageId",
                        column: x => x.posterImageId,
                        principalTable: "PosterImageModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttributesModel_TitlesModel_titlesId",
                        column: x => x.titlesId,
                        principalTable: "TitlesModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Collections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CollectionName = table.Column<string>(type: "text", nullable: false),
                    CollectionImage = table.Column<string>(type: "text", nullable: false),
                    userId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Collections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Collections_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Anime",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    type = table.Column<string>(type: "text", nullable: false),
                    linksId = table.Column<int>(type: "integer", nullable: false),
                    attributesId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Anime", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Anime_AttributesModel_attributesId",
                        column: x => x.attributesId,
                        principalTable: "AttributesModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Anime_LinksModel_linksId",
                        column: x => x.linksId,
                        principalTable: "LinksModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AnimeModelCollectionModel",
                columns: table => new
                {
                    animeId = table.Column<string>(type: "text", nullable: false),
                    collectionsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnimeModelCollectionModel", x => new { x.animeId, x.collectionsId });
                    table.ForeignKey(
                        name: "FK_AnimeModelCollectionModel_Anime_animeId",
                        column: x => x.animeId,
                        principalTable: "Anime",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AnimeModelCollectionModel_Collections_collectionsId",
                        column: x => x.collectionsId,
                        principalTable: "Collections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Anime_attributesId",
                table: "Anime",
                column: "attributesId");

            migrationBuilder.CreateIndex(
                name: "IX_Anime_linksId",
                table: "Anime",
                column: "linksId");

            migrationBuilder.CreateIndex(
                name: "IX_AnimeModelCollectionModel_collectionsId",
                table: "AnimeModelCollectionModel",
                column: "collectionsId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributesModel_coverImageId",
                table: "AttributesModel",
                column: "coverImageId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributesModel_posterImageId",
                table: "AttributesModel",
                column: "posterImageId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributesModel_titlesId",
                table: "AttributesModel",
                column: "titlesId");

            migrationBuilder.CreateIndex(
                name: "IX_Collections_userId",
                table: "Collections",
                column: "userId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnimeModelCollectionModel");

            migrationBuilder.DropTable(
                name: "Anime");

            migrationBuilder.DropTable(
                name: "Collections");

            migrationBuilder.DropTable(
                name: "AttributesModel");

            migrationBuilder.DropTable(
                name: "LinksModel");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "CoverImageModel");

            migrationBuilder.DropTable(
                name: "PosterImageModel");

            migrationBuilder.DropTable(
                name: "TitlesModel");
        }
    }
}
