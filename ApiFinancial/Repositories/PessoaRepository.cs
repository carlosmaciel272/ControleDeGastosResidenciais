using Microsoft.EntityFrameworkCore;
using ApiFinancial.Models;
using ApiFinancial.Repositories.Interfaces;
using ApiFinancial.Services;

namespace ApiFinancial.Repositories;

public class PessoaRepository : IPessoaRepository
{
    private readonly FinancasDbContext _context;

    public PessoaRepository(FinancasDbContext context)
    {
        _context = context;
    }

    public async Task<List<Pessoa>> BuscarTodasAsync()
    {
        return await _context.Pessoa.AsNoTracking().ToListAsync();
    }

    public async Task<Pessoa> AdicionarAsync(Pessoa pessoa)
    {
        await _context.Pessoa.AddAsync(pessoa);
        await _context.SaveChangesAsync();
        return pessoa;
    }

    public async Task<Pessoa?> BuscarPorIdAsync(int id)
    {
        return await _context.Pessoa.FirstOrDefaultAsync(p => p.id == id);
    }

    public async Task RemoverAsync(Pessoa pessoa)
    {
        _context.Pessoa.Remove(pessoa);
        await _context.SaveChangesAsync();
    }
}