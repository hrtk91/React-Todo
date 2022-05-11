using Microsoft.EntityFrameworkCore;
using Server.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
    options.AddPolicy("ReactWebApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000");
        policy.WithHeaders(new []
        {
            "Content-Type",
        });
        policy.WithMethods(new []
        {
            HttpMethod.Get.ToString(),
            HttpMethod.Post.ToString(),
            HttpMethod.Patch.ToString(),
            HttpMethod.Delete.ToString()
        });
    }));

builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("ApplicationDB")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// http接続時のhttpsへのリダイレクト無効化
// app.UseHttpsRedirection();

app.UseCors("ReactWebApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
