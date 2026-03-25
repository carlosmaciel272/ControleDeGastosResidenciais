export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export type CriarPessoaPayload = {
  nome: string;
  idade: number;
};