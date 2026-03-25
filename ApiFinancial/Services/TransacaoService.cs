using ApiFinancial.Models;
using ApiFinancial.Repositories.Interfaces;

namespace ApiFinancial.Services;

public class TransacaoService
{
    private readonly ITransacaoRepository _transacaoRepository;
    private readonly IPessoaRepository _pessoaRepository;
    private readonly ICategoriaRepository _categoriaRepository;
    private readonly IFinalidadeRepository _finalidadeRepository;

    public TransacaoService(
        ITransacaoRepository transacaoRepository,
        IPessoaRepository pessoaRepository,
        ICategoriaRepository categoriaRepository,
        IFinalidadeRepository finalidadeRepository)
    {
        _transacaoRepository = transacaoRepository;
        _pessoaRepository = pessoaRepository;
        _categoriaRepository = categoriaRepository;
        _finalidadeRepository = finalidadeRepository;
    }

    public async Task<List<Transacao>> BuscarTodasAsync()
    {
        return await _transacaoRepository.BuscarTodasAsync();
    }

    public async Task<Transacao> AdicionarAsync(Transacao transacao)
{
    var pessoas = await _pessoaRepository.BuscarTodasAsync();
    var pessoa = pessoas.FirstOrDefault(p => p.id == transacao.pessoaid);

    if (pessoa == null)
        throw new Exception("Pessoa não encontrada.");

    var categorias = await _categoriaRepository.BuscarTodasAsync();
    var categoria = categorias.FirstOrDefault(c => c.id == transacao.categoriaid);

    if (categoria == null)
        throw new Exception("Categoria não encontrada.");

    var finalidade = await _finalidadeRepository.BuscarPorIdAsync(transacao.finalidadeid);

    if (finalidade == null)
        throw new Exception("Finalidade não encontrada.");

    if (string.IsNullOrWhiteSpace(transacao.descricao))
        throw new Exception("A descrição é obrigatória.");

    transacao.descricao = transacao.descricao.Trim();

    if (pessoa.idade < 18 && finalidade.nome.ToLower() == "receita")
        throw new Exception("Pessoa menor de idade não pode receber transação do tipo receita.");

    if (categoria.finalidadeid != transacao.finalidadeid)
        throw new Exception("A categoria selecionada não pertence à finalidade informada.");

    if (transacao.valor <= 0)
        throw new Exception("O valor deve ser maior que zero.");

    return await _transacaoRepository.AdicionarAsync(transacao);
}
}