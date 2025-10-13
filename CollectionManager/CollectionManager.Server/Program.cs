using CollectionManager.Server;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<CollectionManagerContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=collectionmanager.db",
        options => options.EnableRetryOnFailure()
        ));

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Collection Manager");
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapDefaultControllerRoute();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
