using ApiFinancial.Models;
using ApiFinancial.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiFinancial.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FinalidadeController : ControllerBase
{
    private readonly FinalidadeService _finalidadeService;

    public FinalidadeController(FinalidadeService finalidadeService)
    {
        _finalidadeService = finalidadeService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Finalidade>>> BuscarTodas()
    {
        var finalidades = await _finalidadeService.BuscarTodasAsync();
        return Ok(finalidades);
    }
}