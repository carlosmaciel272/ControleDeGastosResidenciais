export type Categoria = {
  id: number;
  descricao: string;
  finalidadeid: number;
  finalidade?: {
    id: number;
    nome: string;
  } | null;
  icone?: string | null;
};
export type CriarCategoriaPayload = {
  descricao: string;
  finalidadeid: number;
};