import type { Pessoa } from "../models/types";
import type { CriarPessoaPayload } from "../models/types";

const API_URL = "http://localhost:5132/api/pessoa"

export async function BuscarPessoas(): Promise<Pessoa[]> {
const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar pessoas");
  }

  return response.json();
}
export async function excluirPessoas(ids: number[]): Promise<void> {
  const response = await fetch(API_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  });

  if (!response.ok) {
    const erro = await response.json().catch(() => null);
    throw new Error(erro?.mensagem || "Erro ao excluir pessoas.");
  }
}
export async function criarPessoa(payload: CriarPessoaPayload): Promise<Pessoa> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    let mensagem = "Erro ao cadastrar pessoa.";

    if (contentType && contentType.includes("application/json")) {
      const erro = await response.json().catch(() => null);
      mensagem = erro?.mensagem || mensagem;
    }

    throw new Error(mensagem);
  }

  return response.json();
}