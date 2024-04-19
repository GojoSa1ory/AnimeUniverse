﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RSPOCourseWork.Migrations
{
    /// <inheritdoc />
    public partial class CollectionModelUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Collections_Users_userId",
                table: "Collections");

            migrationBuilder.AlterColumn<int>(
                name: "userId",
                table: "Collections",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Collections_Users_userId",
                table: "Collections",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Collections_Users_userId",
                table: "Collections");

            migrationBuilder.AlterColumn<int>(
                name: "userId",
                table: "Collections",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Collections_Users_userId",
                table: "Collections",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
