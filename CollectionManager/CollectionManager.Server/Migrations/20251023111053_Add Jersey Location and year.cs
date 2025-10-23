using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CollectionManager.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddJerseyLocationandyear : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Leage",
                table: "MonitoringSearches");

            migrationBuilder.DropColumn(
                name: "Leage",
                table: "DroppedItems");

            migrationBuilder.DropColumn(
                name: "Leage",
                table: "CollectionItems");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "MonitoringSearches",
                newName: "League");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "DroppedItems",
                newName: "League");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "CollectionItems",
                newName: "League");

            migrationBuilder.AlterColumn<int>(
                name: "JerseyNumber",
                table: "MonitoringSearches",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "JerseyName",
                table: "MonitoringSearches",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "MonitoringSearches",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "JerseyNumber",
                table: "DroppedItems",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "JerseyName",
                table: "DroppedItems",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Condition",
                table: "DroppedItems",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "DroppedItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "JerseyNumber",
                table: "CollectionItems",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "JerseyName",
                table: "CollectionItems",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "CollectionItems",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "CollectionItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Year",
                table: "MonitoringSearches");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "DroppedItems");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "CollectionItems");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "CollectionItems");

            migrationBuilder.RenameColumn(
                name: "League",
                table: "MonitoringSearches",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "League",
                table: "DroppedItems",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "League",
                table: "CollectionItems",
                newName: "Name");

            migrationBuilder.AlterColumn<int>(
                name: "JerseyNumber",
                table: "MonitoringSearches",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "JerseyName",
                table: "MonitoringSearches",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Leage",
                table: "MonitoringSearches",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "JerseyNumber",
                table: "DroppedItems",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "JerseyName",
                table: "DroppedItems",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Condition",
                table: "DroppedItems",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Leage",
                table: "DroppedItems",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "JerseyNumber",
                table: "CollectionItems",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "JerseyName",
                table: "CollectionItems",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Leage",
                table: "CollectionItems",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
