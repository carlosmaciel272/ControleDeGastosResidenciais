import styled from "styled-components";
import { NavLink } from "react-router-dom";
import addPessoa from "../../assets/icons/addPessoa.svg";
import deletePessoa from "../../assets/icons/deletePessoa.svg";
import editPessoa from "../../assets/icons/editPessoa.svg";
import listPessoa from "../../assets/icons/listPessoa.svg";
import BeVietnamBold from "../../assets/fonts/BeVietnamPro-Bold.ttf";
import BeVietnamMedium from "../../assets/fonts/BeVietnamPro-Medium.ttf";

const CardsLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 220px);
  justify-content: center;

  column-gap: 80px;
  row-gap: 12px;

  padding-top: 20px;
  padding-right: 30px;
  padding-bottom: 50px;
  padding-left: 30px;

  
`;

const CardLink = styled(NavLink)`
  text-decoration: none;
`;

const CardContent = styled.div`
  width: 250px;
  height: 290px;
  background-color: #e9e9e9;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: 0.2s ease-in-out;
  cursor: pointer;

  ${CardLink}:hover & {
    transform: translateY(-2px);
  }
`;

const CardIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 14px;
`;

const CardTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #111;
  text-align: center;
  line-height: 1.2;
  font-family: 'BeVietnamBold', sans-serif;
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

export function Cards() {
  return (
    <GlobalFont>
      <CardsLayout>
        <CardLink to="/create-pessoa">
          <CardContent>
            <CardIcon src={addPessoa} alt="Adicionar Pessoa" />
            <CardTitle>Adicionar Pessoa</CardTitle>
          </CardContent>
        </CardLink>

        <CardLink to="/delete-pessoa">
          <CardContent>
            <CardIcon src={deletePessoa} alt="Excluir Pessoa" />
            <CardTitle>Excluir Pessoa</CardTitle>
          </CardContent>
        </CardLink>

        <CardLink to="/edit-pessoa">
          <CardContent>
            <CardIcon src={editPessoa} alt="Editar Cadastro" />
            <CardTitle>Editar Cadastro</CardTitle>
          </CardContent>
        </CardLink>

        <CardLink to="/pessoa/list-pessoa">
          <CardContent>
            <CardIcon src={listPessoa} alt="Listar Pessoas" />
            <CardTitle>Listar Pessoas</CardTitle>
          </CardContent>
        </CardLink>
      </CardsLayout>
    </GlobalFont>
  );
}