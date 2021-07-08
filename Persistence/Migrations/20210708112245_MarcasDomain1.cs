using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class MarcasDomain1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Marcas");

            migrationBuilder.DropColumn(
                name: "Venue",
                table: "Marcas");

            migrationBuilder.AddColumn<DateTime>(
                name: "Expire",
                table: "Marcas",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Expire",
                table: "Marcas");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Marcas",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Venue",
                table: "Marcas",
                nullable: true);
        }
    }
}
