using ApiFinancial.Models;
using ApiFinancial.Repositories.Interfaces;

namespace ApiFinancial.Services
{
    public class PessoaService
    {
        private readonly IPessoaRepository _pessoaRepository;
        private readonly ITransacaoRepository _transacaoRepository;

        public PessoaService(
            IPessoaRepository pessoaRepository,
            ITransacaoRepository transacaoRepository)
        {
            _pessoaRepository = pessoaRepository;
            _transacaoRepository = transacaoRepository;
        }

        public async Task<List<Pessoa>> BuscarTodasAsync()
        {
            return await _pessoaRepository.BuscarTodasAsync();
        }

        public async Task<Pessoa> AdicionarAsync(Pessoa pessoa)
        {
            return await _pessoaRepository.AdicionarAsync(pessoa);
        }

        public async Task ExcluirAsync(int pessoaId)
        {
            var pessoa = await _pessoaRepository.BuscarPorIdAsync(pessoaId);

            if (pessoa == null)
                throw new Exception("Pessoa não encontrada.");

            await _transacaoRepository.RemoverPorPessoaIdAsync(pessoaId);
            await _pessoaRepository.RemoverAsync(pessoa);
        }
    }
}