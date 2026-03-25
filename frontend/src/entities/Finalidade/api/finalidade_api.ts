import type { Finalidade } from "../models/types";

const API_URL = "http://localhost:5132/api/finalidade";

export async function buscarFinalidades(): Promise<Finalidade[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar finalidades.");
  }

  return response.json();
}