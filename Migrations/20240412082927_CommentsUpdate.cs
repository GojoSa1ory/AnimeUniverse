using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RSPOCourseWork.Migrations
{
    /// <inheritdoc />
    public partial class CommentsUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnimeModelCommentModel_CommentModel_commentsId",
                table: "AnimeModelCommentModel");

            migrationBuilder.DropForeignKey(
                name: "FK_CommentModel_Users_UserId",
                table: "CommentModel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CommentModel",
                table: "CommentModel");

            migrationBuilder.RenameTable(
                name: "CommentModel",
                newName: "Comments");

            migrationBuilder.RenameIndex(
                name: "IX_CommentModel_UserId",
                table: "Comments",
                newName: "IX_Comments_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Comments",
                table: "Comments",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AnimeModelCommentModel_Comments_commentsId",
                table: "AnimeModelCommentModel",
                column: "commentsId",
                principalTable: "Comments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Users_UserId",
                table: "Comments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnimeModelCommentModel_Comments_commentsId",
                table: "AnimeModelCommentModel");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Users_UserId",
                table: "Comments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Comments",
                table: "Comments");

            migrationBuilder.RenameTable(
                name: "Comments",
                newName: "CommentModel");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_UserId",
                table: "CommentModel",
                newName: "IX_CommentModel_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CommentModel",
                table: "CommentModel",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AnimeModelCommentModel_CommentModel_commentsId",
                table: "AnimeModelCommentModel",
                column: "commentsId",
                principalTable: "CommentModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CommentModel_Users_UserId",
                table: "CommentModel",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
