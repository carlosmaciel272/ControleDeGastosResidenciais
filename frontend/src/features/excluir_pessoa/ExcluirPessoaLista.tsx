import { useEffect, useState } from "react";
import styled from "styled-components";
import { BuscarPessoas, excluirPessoas } from "../../entities/Pessoa/api/pessoa_api";
import type { Pessoa } from "../../entities/Pessoa/models/types";
import BeVietnamBold from "../../assets/fonts/BeVietnamPro-Bold.ttf"
import BeVietnamMedium from "../../assets/fonts/BeVietnamPro-Medium.ttf"

export function ExcluirPessoaLista() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [excluindo, setExcluindo] = useState(false);

  async function carregarPessoas() {
    try {
      setCarregando(true);
      setErro("");
      const data = await BuscarPessoas();
      setPessoas(data);
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro ao buscar pessoas.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarPessoas();
  }, []);

  function togglePessoa(id: number) {
    setSelecionadas((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  async function handleExcluir() {
    if (selecionadas.length === 0) {
      setErro("Selecione ao menos uma pessoa para excluir.");
      return;
    }

    try {
      setExcluindo(true);
      setErro("");

      await excluirPessoas(selecionadas);

      setSelecionadas([]);
      await carregarPessoas();
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro ao excluir pessoas.");
    } finally {
      setExcluindo(false);
    }
  }

  if (carregando) {
    return <Mensagem>Carregando pessoas...</Mensagem>;
  }

  return (
    <Container>
        <GlobalFont></GlobalFont>
      <Titulo>Excluir Pessoa</Titulo>

      <Lista>
        {pessoas.map((pessoa) => (
          <Item key={pessoa.id}>
            <CheckContainer>
              <Checkbox
                type="checkbox"
                checked={selecionadas.includes(pessoa.id)}
                onChange={() => togglePessoa(pessoa.id)}
              />
            </CheckContainer>

            <IconPlaceholder />

            <NomePessoa title={pessoa.nome}>{pessoa.nome}</NomePessoa>
          </Item>
        ))}
      </Lista>

      <BotaoExcluir onClick={handleExcluir} disabled={excluindo}>
        {excluindo ? "Excluindo..." : "Excluir"}
      </BotaoExcluir>

      {erro && <MensagemErro>{erro}</MensagemErro>}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 24px 12px 40px;
  box-sizing: border-box;
`;
const GlobalFont = styled.div`
  @font-face {
    font-family: 'BeVietnamBold';
    src: url(${BeVietnamBold}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'BeVietnamMedium';
    src: url(${BeVietnamMedium}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;
const Titulo = styled.h1`
  margin: 0 0 34px 0;
  text-align: center;
  color: #5797FF;
  font-size: 3rem;
  font-weight: 700;
  font-family: 'BeVietnamBold';
`;

const Lista = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'BeVietnamMedium';
`;

const Item = styled.div`
  min-height: 102px;
  display: grid;
  grid-template-columns: 56px 56px 1fr;
  align-items: center;
  column-gap: 18px;
  border-bottom: 1px solid #dddddd;
`;

const CheckContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Checkbox = styled.input`
  width: 22px;
  height: 22px;
  cursor: pointer;
  accent-color: #5797FF;
`;

const IconPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid #5797FF;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border: 4px solid #5797FF;
    border-radius: 50%;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    background: #f5f5f5;
  }

  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 10px;
    border-radius: 12px 12px 8px 8px;
    background: #5797FF;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const NomePessoa = styled.div`
  color: #b5b5b5;
  font-size: 1.1rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'BeVietnamMedium';
`;

const BotaoExcluir = styled.button`
  width: 100%;
  height: 92px;
  margin-top: 34px;
  border: none;
  border-radius: 6px;
  background: #5797FF;
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;
  font-family: 'BeVietnamMedium';

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Mensagem = styled.p`
  text-align: center;
  color: #666;
  font-family: 'BeVietnamMedium';
`;

const MensagemErro = styled.p`
  margin-top: 16px;
  text-align: center;
  color: #d32f2f;
  font-weight: 600;
  font-family: 'BeVietnamMedium';
`;