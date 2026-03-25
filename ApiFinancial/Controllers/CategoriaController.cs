using ApiFinancial.Models;
using ApiFinancial.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiFinancial.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriaController : ControllerBase
{
    private readonly CategoriaService _categoriaService;

    public CategoriaController(CategoriaService categoriaService)
    {
        _categoriaService = categoriaService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Categoria>>> BuscarTodas()
    {
        var categorias = await _categoriaService.BuscarTodasAsync();
        return Ok(categorias);
    }

    [HttpPost]
    public async Task<ActionResult<Categoria>> Criar([FromBody] Categoria categoria)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (string.IsNullOrWhiteSpace(categoria.descricao))
            return BadRequest(new { mensagem = "A descrição é obrigatória e não pode estar vazia." });

        try
        {
            var categoriaCriada = await _categoriaService.AdicionarAsync(categoria);
            return Ok(categoriaCriada);
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }
}