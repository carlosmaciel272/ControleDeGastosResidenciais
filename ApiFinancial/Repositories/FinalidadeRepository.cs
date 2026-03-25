using ApiFinancial.Models;
using ApiFinancial.Repositories.Interfaces;
using ApiFinancial.Services;
using Microsoft.EntityFrameworkCore;

namespace ApiFinancial.Repositories;

public class FinalidadeRepository : IFinalidadeRepository
{
    private readonly FinancasDbContext _context;

    public FinalidadeRepository(FinancasDbContext context)
    {
        _context = context;
    }

    public async Task<List<Finalidade>> BuscarTodasAsync()
    {
        return await _context.Finalidade
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Finalidade?> BuscarPorIdAsync(int id)
    {
        return await _context.Finalidade
            .AsNoTracking()
            .FirstOrDefaultAsync(f => f.id == id);
    }
}