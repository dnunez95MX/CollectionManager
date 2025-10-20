using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CollectionManager.Server.Migrations
{
    /// <inheritdoc />
    public partial class InformationLogs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Condition",
                table: "Jerseys");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Jerseys");

            migrationBuilder.DropColumn(
                name: "Link",
                table: "Jerseys");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Jerseys");

            migrationBuilder.DropColumn(
                name: "SetValue",
                table: "Jerseys");

            migrationBuilder.CreateTable(
                name: "Logs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logs", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Logs");

            migrationBuilder.AddColumn<string>(
                name: "Condition",
                table: "Jerseys",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Jerseys",
                type: "character varying(13)",
                maxLength: 13,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Link",
                table: "Jerseys",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "Jerseys",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SetValue",
                table: "Jerseys",
                type: "integer",
                nullable: true);
        }
    }
}
