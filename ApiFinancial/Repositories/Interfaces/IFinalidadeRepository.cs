using ApiFinancial.Models;

namespace ApiFinancial.Repositories.Interfaces;

public interface IFinalidadeRepository
{
    Task<List<Finalidade>> BuscarTodasAsync();
    Task<Finalidade?> BuscarPorIdAsync(int id);
}