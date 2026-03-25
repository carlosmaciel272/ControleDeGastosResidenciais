export type Transacao = {
  id: string;
  descricao: string;
  valor: number;
  pessoaid: number;
  pessoa: {
    id: number;
    nome: string;
    idade: number;
  };
  categoriaid: number;
  categoria: {
    id: number;
    descricao: string;
    finalidadeid: number;
    icone?: string | null;
  };
  finalidadeid: number;
  finalidade: {
    id: number;
    nome: string;
  };
};

export type CriarTransacaoPayload = {
  descricao: string;
  pessoaid: number;
  categoriaid: number;
  finalidadeid: number;
  valor: number;
};