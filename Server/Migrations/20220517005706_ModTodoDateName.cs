using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    public partial class ModTodoDateName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DoneAt",
                table: "Todos",
                newName: "CompletionDate");

            migrationBuilder.RenameColumn(
                name: "Created",
                table: "Todos",
                newName: "CreatedDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "Todos",
                newName: "Created");

            migrationBuilder.RenameColumn(
                name: "CompletionDate",
                table: "Todos",
                newName: "DoneAt");
        }
    }
}
