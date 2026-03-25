import { useState } from "react";
import styled from "styled-components";
import { CriarCategoriaForm } from "../features/criar_categoria/CriarCategoriaForm";
import ListaCategorias from "../features/listar_categoria/ListaCategorias";

export default function Categoria() {
  const [refreshKey, setRefreshKey] = useState(0);

  function atualizarLista() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <PageContainer>
      <Content>
        <LeftSide>
          <CriarCategoriaForm onCategoriaCriada={atualizarLista} />
        </LeftSide>

        <RightSide>
          <ListaCategorias refreshKey={refreshKey} />
        </RightSide>
      </Content>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f3f3f3;
  padding: 40px 48px;
  box-sizing: border-box;
`;

const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 48px;
  align-items: flex-start;
`;

const LeftSide = styled.div`
  flex: 1;
`;

const RightSide = styled.div`
  width: 380px;
  padding-top: 58px;
`;