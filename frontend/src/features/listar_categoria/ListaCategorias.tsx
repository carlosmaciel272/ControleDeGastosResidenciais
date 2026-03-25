import { useEffect, useState } from "react";
import styled from "styled-components";
import { buscarCategorias } from "../../entities/Categoria/api/categoria_api";
import type { Categoria } from "../../entities/Categoria/models/types";
import BeVietnamBold from "../../assets/fonts/BeVietnamPro-Bold.ttf"
import BeVietnamMedium from "../../assets/fonts/BeVietnamPro-Medium.ttf"
type Props = {
  refreshKey?: number;
};

export default function ListaCategorias({ refreshKey }: Props) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarCategorias() {
      try {
        setLoading(true);
        setErro("");
        const data = await buscarCategorias();
        setCategorias(data);
      } catch (error) {
        setErro(
          error instanceof Error ? error.message : "Erro ao buscar categorias."
        );
      } finally {
        setLoading(false);
      }
    }

    carregarCategorias();
  }, [refreshKey]);

  if (loading) {
    return <Message>Carregando categorias...</Message>;
  }

  if (erro) {
    return <Message $error>{erro}</Message>;
  }

  return (
    <Wrapper>
        <GlobalFont>
      <Header>
        <HeaderCell>Nome</HeaderCell>
        <HeaderCell>Finalidade</HeaderCell>
      </Header>

      <Body>
        {categorias.map((categoria) => (
          <Row key={categoria.id}>
            <CategoriaNome>{categoria.descricao}</CategoriaNome>
            <CategoriaFinalidade>{categoria.finalidade.nome}</CategoriaFinalidade>
          </Row>
        ))}

        {categorias.length === 0 && (
          <Message>Nenhuma categoria cadastrada.</Message>
        )}
      </Body>
      </GlobalFont>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 360px;
  font-family:"BeVietnamBold";
`;

const Header = styled.div`
  width: 100%;
  height: 86px;
  background: #efefef;
  border-radius: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 0 26px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const HeaderCell = styled.div`
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  color: #8a8a8a;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  min-height: 92px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid #dedede;
`;

const CategoriaNome = styled.div`
  text-align: center;
  color: #5b82ff;
  font-weight: 700;
`;

const CategoriaFinalidade = styled.div`
  text-align: center;
  color: #111;
  font-weight: 700;
`;

const Message = styled.p<{ $error?: boolean }>`
  text-align: center;
  color: ${({ $error }) => ($error ? "#d32f2f" : "#666")};
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