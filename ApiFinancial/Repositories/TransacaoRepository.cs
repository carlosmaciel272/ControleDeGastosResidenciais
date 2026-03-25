using ApiFinancial.Models;
using ApiFinancial.Repositories.Interfaces;
using ApiFinancial.Services;
using Microsoft.EntityFrameworkCore;

namespace ApiFinancial.Repositories;

public class TransacaoRepository : ITransacaoRepository
{
    private readonly FinancasDbContext _context;

    public TransacaoRepository(FinancasDbContext context)
    {
        _context = context;
    }

    public async Task<List<Transacao>> BuscarTodasAsync()
    {
        return await _context.Transacao
            .AsNoTracking()
            .Include(t => t.pessoa)
            .Include(t => t.categoria)
                .ThenInclude(c => c!.finalidade)
            .Include(t => t.finalidade)
            .ToListAsync();
    }

    public async Task<Transacao> AdicionarAsync(Transacao transacao)
    {
        await _context.Transacao.AddAsync(transacao);
        await _context.SaveChangesAsync();

        return await _context.Transacao
            .AsNoTracking()
            .Include(t => t.pessoa)
            .Include(t => t.categoria)
                .ThenInclude(c => c!.finalidade)
            .Include(t => t.finalidade)
            .FirstAsync(t => t.id == transacao.id);
    }

    public async Task<List<Transacao>> BuscarPorPessoaIdAsync(int pessoaId)
    {
        return await _context.Transacao
            .Where(t => t.pessoaid == pessoaId)
            .ToListAsync();
    }

    public async Task RemoverPorPessoaIdAsync(int pessoaId)
    {
        var transacoes = await _context.Transacao
            .Where(t => t.pessoaid == pessoaId)
            .ToListAsync();

        if (transacoes.Any())
        {
            _context.Transacao.RemoveRange(transacoes);
            await _context.SaveChangesAsync();
        }
    }
}