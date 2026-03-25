using ApiFinancial.Models;
using ApiFinancial.Repositories.Interfaces;
using ApiFinancial.Services;
using Microsoft.EntityFrameworkCore;

namespace ApiFinancial.Repositories;

public class CategoriaRepository : ICategoriaRepository
{
    private readonly FinancasDbContext _context;

    public CategoriaRepository(FinancasDbContext context)
    {
        _context = context;
    }

    public async Task<List<Categoria>> BuscarTodasAsync()
    {
        return await _context.Categoria
            .AsNoTracking()
            .Include(c => c.finalidade)
            .ToListAsync();
    }

    public async Task<Categoria> AdicionarAsync(Categoria categoria)
    {
        await _context.Categoria.AddAsync(categoria);
        await _context.SaveChangesAsync();

        return await _context.Categoria
            .AsNoTracking()
            .Include(c => c.finalidade)
            .FirstAsync(c => c.id == categoria.id);
    }
}