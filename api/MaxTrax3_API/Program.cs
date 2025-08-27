using MaxTrax3_API.Services;
using MaxTrax3_API.Data;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
    p.WithOrigins("http://localhost:5173")
     .AllowAnyHeader()
     .AllowAnyMethod()
));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DI
builder.Services.AddSingleton<IClock, SystemClock>();
builder.Services.AddScoped<IDbAdapter, SqlServerAdapter>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<DefectsService>();

var app = builder.Build();
app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/health", () => Results.Ok(new { ok = true, env = app.Environment.EnvironmentName }));

app.MapControllers();

app.Run();
