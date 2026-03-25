using ApiFinancial.Models;
using ApiFinancial.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiFinancial.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    private readonly PessoaService _pessoaService;

    public PessoaController(PessoaService pessoaService)
    {
        _pessoaService = pessoaService;
    }

    [HttpDelete]
public async Task<IActionResult> ExcluirPessoas([FromBody] ExcluirPessoasRequest request)
{
    if (request.ids == null || !request.ids.Any())
        return BadRequest(new { mensagem = "Informe ao menos uma pessoa para excluir." });

    try
    {
        foreach (var id in request.ids)
        {
            await _pessoaService.ExcluirAsync(id);
        }

        return NoContent();
    }
    catch (Exception ex)
    {
        return BadRequest(new { mensagem = ex.Message });
    }
}
[HttpDelete("{id}")]
public async Task<IActionResult> ExcluirPessoa(int id)
{
    try
    {
        await _pessoaService.ExcluirAsync(id);
        return NoContent();
    }
    catch (Exception ex)
    {
        return BadRequest(new { mensagem = ex.Message });
    }
}
 [HttpPost]
    public async Task<ActionResult<Pessoa>> CriarPessoa([FromBody] Pessoa pessoa)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (string.IsNullOrWhiteSpace(pessoa.nome))
            return BadRequest(new { mensagem = "O nome é obrigatório e não pode estar vazio." });

        var pessoaCriada = await _pessoaService.AdicionarAsync(pessoa);

        return Ok(pessoaCriada);
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pessoa>>> GetPessoa()
    {
        var pessoas = await _pessoaService.BuscarTodasAsync();
        return Ok(pessoas);
    }
    
}