using ApiFinancial.Models;
using ApiFinancial.Repositories.Interfaces;

namespace ApiFinancial.Services;

public class FinalidadeService
{
    private readonly IFinalidadeRepository _finalidadeRepository;

    public FinalidadeService(IFinalidadeRepository finalidadeRepository)
    {
        _finalidadeRepository = finalidadeRepository;
    }

    public async Task<List<Finalidade>> BuscarTodasAsync()
    {
        return await _finalidadeRepository.BuscarTodasAsync();
    }
}