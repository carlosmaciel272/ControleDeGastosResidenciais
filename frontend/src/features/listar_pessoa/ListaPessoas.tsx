import { BuscarPessoas } from "../../entities/Pessoa/api/pessoa_api";
import { useEffect, useState } from "react";
import type { Pessoa } from "../../entities/Pessoa/models/types";
import styled from "styled-components";

export function ListaPessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarPessoas() {
      try {
        setCarregando(true);
        setErro("");

        const dados = await BuscarPessoas();
        setPessoas(dados);
      } catch (error) {
        setErro("Erro ao carregar pessoas");
        console.error(error);
      } finally {
        setCarregando(false);
      }
    }

    carregarPessoas();
  }, []);

  if (carregando) {
    return <Mensagem>Status: carregando pessoas...</Mensagem>;
  }

  if (erro) {
    return <Mensagem>{erro}</Mensagem>;
  }

  return (
    <Container>
      <Titulo>Listar Pessoas</Titulo>

      <Cabecalho>
        <CabecalhoTexto>Nome</CabecalhoTexto>
        <CabecalhoTexto>Idade</CabecalhoTexto>
      </Cabecalho>

      <Lista>
        {pessoas.map((pessoa) => (
          <Linha key={pessoa.id}>
            <Nome>{pessoa.nome}</Nome>
            <Idade>{pessoa.idade}</Idade>
          </Linha>
        ))}
      </Lista>
    </Container>
  );
}

const Container = styled.div`
  max-width: 390px;
  margin: 0 auto;
  padding: 24px 20px 40px;
  font-family: Arial, sans-serif;
`;

const Titulo = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #5b82ff;
  margin: 0 0 32px 0;
`;

const Cabecalho = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px;
  align-items: center;
  background: #f3f3f3;
  border-radius: 999px;
  padding: 30px 38px;
  margin-bottom: 18px;
`;

const CabecalhoTexto = styled.span`
  color: #8f8f8f;
  font-size: 18px;
  font-weight: 700;
`;

const Lista = styled.div`
  display: flex;
  flex-direction: column;
`;

const Linha = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px;
  align-items: center;
  padding: 30px 38px;
  border-bottom: 1px solid #d9d9d9;
`;

const Nome = styled.span`
  color: #5b82ff;
  font-size: 18px;
  font-weight: 700;
`;

const Idade = styled.span`
  color: #111111;
  font-size: 18px;
  font-weight: 700;
`;

const Mensagem = styled.p`
  font-size: 18px;
  color: #444;
  text-align: center;
  margin-top: 40px;
`;