using ApiFinancial.Models;

namespace ApiFinancial.Repositories.Interfaces;

public interface ICategoriaRepository
{
    Task<List<Categoria>> BuscarTodasAsync();
    Task<Categoria> AdicionarAsync(Categoria categoria);
}