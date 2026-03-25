using ApiFinancial.Models;

namespace ApiFinancial.Repositories.Interfaces;

public interface IPessoaRepository
{
    Task<List<Pessoa>> BuscarTodasAsync();
    Task<Pessoa> AdicionarAsync(Pessoa pessoa);
    Task<Pessoa?> BuscarPorIdAsync(int id);
    Task RemoverAsync(Pessoa pessoa);
}