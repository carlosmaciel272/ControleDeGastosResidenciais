using ApiFinancial.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiFinancial.Services;

public class FinancasDbContext : DbContext
{
    public FinancasDbContext(DbContextOptions<FinancasDbContext> options) : base(options)
    {
    }

    public DbSet<Pessoa> Pessoa { get; set; }
    public DbSet<Categoria> Categoria { get; set; }
    public DbSet<Finalidade> Finalidade { get; set; }
    public DbSet<Transacao> Transacao { get; set; }
}