import type { CriarTransacaoPayload, Transacao } from "../models/types";

const API_URL = "http://localhost:5132/api/transacao";

export async function buscarTransacoes(): Promise<Transacao[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar transações.");
  }

  return response.json();
}

export async function criarTransacao(payload: CriarTransacaoPayload): Promise<Transacao> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    let mensagem = "Erro ao criar transação.";

    if (contentType && contentType.includes("application/json")) {
      const erro = await response.json().catch(() => null);
      mensagem = erro?.mensagem || mensagem;
    }

    throw new Error(mensagem);
  }

  return response.json();
}