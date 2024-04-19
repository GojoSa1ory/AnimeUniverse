using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RSPOCourseWork.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Admin",
                table: "Roles");

            migrationBuilder.RenameColumn(
                name: "DefaultUser",
                table: "Roles",
                newName: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Roles",
                newName: "DefaultUser");

            migrationBuilder.AddColumn<string>(
                name: "Admin",
                table: "Roles",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
