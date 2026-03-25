using ApiFinancial.Models;

namespace ApiFinancial.Repositories.Interfaces;

public interface ITransacaoRepository
{
    Task<List<Transacao>> BuscarTodasAsync();
    Task<Transacao> AdicionarAsync(Transacao transacao);
    Task<List<Transacao>> BuscarPorPessoaIdAsync(int pessoaId);
    Task RemoverPorPessoaIdAsync(int pessoaId);
}