import type { Transacao } from "../../entities/Transacao/models/types";

export function formatarMoeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

export function filtrarTransacoes(
  transacoes: Transacao[],
  filtros: {
    pessoaid: number | null;
    categoriaid: number | null;
    finalidadeid: number | null;
  }
) {
  return transacoes.filter((transacao) => {
    const pessoaOk = !filtros.pessoaid || transacao.pessoaid === filtros.pessoaid;
    const categoriaOk = !filtros.categoriaid || transacao.categoriaid === filtros.categoriaid;
    const finalidadeOk = !filtros.finalidadeid || transacao.finalidadeid === filtros.finalidadeid;

    return pessoaOk && categoriaOk && finalidadeOk;
  });
}

export function calcularTotalLista(transacoesFiltradas: Transacao[]) {
  return transacoesFiltradas.reduce((acc, item) => acc + item.valor, 0);
}

export function calcularSaldo(
  transacoes: Transacao[],
  pessoaid: number | null
) {
  const base = pessoaid
    ? transacoes.filter((t) => t.pessoaid === pessoaid)
    : transacoes;

  const totalDespesas = base
    .filter((t) => t.finalidade.nome.toLowerCase() === "despesa")
    .reduce((acc, item) => acc + item.valor, 0);

  const totalReceitas = base
    .filter((t) => t.finalidade.nome.toLowerCase() === "receita")
    .reduce((acc, item) => acc + item.valor, 0);

  return totalReceitas - totalDespesas  ;
}