using Microsoft.EntityFrameworkCore;
using ApiFinancial.Services;
using ApiFinancial.Repositories;
using ApiFinancial.Repositories.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContextPool<FinancasDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("FinancasDbContext")));

builder.Services.AddScoped<IPessoaRepository, PessoaRepository>();
builder.Services.AddScoped<PessoaService>();

builder.Services.AddScoped<ICategoriaRepository, CategoriaRepository>();
builder.Services.AddScoped<IFinalidadeRepository, FinalidadeRepository>();
builder.Services.AddScoped<CategoriaService>();
builder.Services.AddScoped<FinalidadeService>();
builder.Services.AddScoped<ITransacaoRepository, TransacaoRepository>();
builder.Services.AddScoped<TransacaoService>();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("frontend");
//app.UseHttpsRedirection();

app.MapControllers();

app.Run();