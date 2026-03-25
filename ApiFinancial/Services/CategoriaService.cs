using ApiFinancial.Models;
using ApiFinancial.Repositories.Interfaces;

namespace ApiFinancial.Services;

public class CategoriaService
{
    private readonly ICategoriaRepository _categoriaRepository;
    private readonly IFinalidadeRepository _finalidadeRepository;

    public CategoriaService(
        ICategoriaRepository categoriaRepository,
        IFinalidadeRepository finalidadeRepository)
    {
        _categoriaRepository = categoriaRepository;
        _finalidadeRepository = finalidadeRepository;
    }

    public async Task<List<Categoria>> BuscarTodasAsync()
    {
        return await _categoriaRepository.BuscarTodasAsync();
    }

    public async Task<Categoria> AdicionarAsync(Categoria categoria)
    {
        var finalidade = await _finalidadeRepository.BuscarPorIdAsync(categoria.finalidadeid);

        if (finalidade == null)
            throw new Exception("Finalidade não encontrada.");

        categoria.descricao = categoria.descricao?.Trim();

        return await _categoriaRepository.AdicionarAsync(categoria);
    }
}