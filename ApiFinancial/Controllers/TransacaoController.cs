using ApiFinancial.Models;
using ApiFinancial.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiFinancial.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacaoController : ControllerBase
{
    private readonly TransacaoService _transacaoService;

    public TransacaoController(TransacaoService transacaoService)
    {
        _transacaoService = transacaoService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transacao>>> BuscarTodas()
    {
        var transacoes = await _transacaoService.BuscarTodasAsync();
        return Ok(transacoes);
    }

    [HttpPost]
    public async Task<ActionResult<Transacao>> Criar([FromBody] Transacao transacao)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var transacaoCriada = await _transacaoService.AdicionarAsync(transacao);
            return Ok(transacaoCriada);
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }
}