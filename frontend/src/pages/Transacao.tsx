import { useEffect, useMemo, useState } from "react";
import BeVietnamBold from "../assets/fonts/BeVietnamPro-Bold.ttf"
import BeVietnamMedium from "../assets/fonts/BeVietnamPro-Medium.ttf"
import styled from "styled-components";
import { buscarTransacoes } from "../entities/Transacao/api/transacao_api";
import { BuscarPessoas } from "../entities/Pessoa/api/pessoa_api";
import { buscarCategorias } from "../entities/Categoria/api/categoria_api";
import { buscarFinalidades } from "../entities/Finalidade/api/finalidade_api";
import type { Transacao } from "../entities/Transacao/models/types";
import type { Pessoa } from "../entities/Pessoa/models/types";
import type { Categoria } from "../entities/Categoria/models/types";
import type { Finalidade } from "../entities/Finalidade/models/types";
import { CriarTransacaoForm } from "../features/criar_transacao/CriarTransacaoForm";
import {
  calcularSaldo,
  calcularTotalLista,
  filtrarTransacoes,
  formatarMoeda,
} from "../features/filtros_transacao/lib";

export default function TransacaoPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [finalidades, setFinalidades] = useState<Finalidade[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [filtros, setFiltros] = useState({
    pessoaid: 0,
    categoriaid: 0,
    finalidadeid: 0,
  });

  async function carregarTela() {
    try {
      const transacoesData = await buscarTransacoes();
      setTransacoes(transacoesData);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }

    try {
      const pessoasData = await BuscarPessoas();
      setPessoas(pessoasData);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
    }

    try {
      const categoriasData = await buscarCategorias();
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }

    try {
      const finalidadesData = await buscarFinalidades();
      setFinalidades(finalidadesData);
    } catch (error) {
      console.error("Erro ao buscar finalidades:", error);
    }
  }

  useEffect(() => {
    carregarTela();
  }, []);

  const transacoesFiltradas = useMemo(() => {
    return filtrarTransacoes(transacoes, {
      pessoaid: filtros.pessoaid || null,
      categoriaid: filtros.categoriaid || null,
      finalidadeid: filtros.finalidadeid || null,
    });
  }, [transacoes, filtros]);

  const total = useMemo(() => {
    return calcularTotalLista(transacoesFiltradas);
  }, [transacoesFiltradas]);

  const saldo = useMemo(() => {
    return calcularSaldo(transacoes, filtros.pessoaid || null);
  }, [transacoes, filtros.pessoaid]);

  return (
    <Page>
      <Content>
        <LeftColumn>
          <GlobalFont></GlobalFont>
          <Title>Minhas Transações</Title>

          <TopRow>
            <FiltersRow>
              <FilterSelect
                value={filtros.categoriaid}
                onChange={(e) =>
                  setFiltros((prev) => ({
                    ...prev,
                    categoriaid: Number(e.target.value),
                  }))
                }
              >
                <option value={0}>Filtrar por Categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.descricao}
                  </option>
                ))}
              </FilterSelect>

              <FilterSelect
                value={filtros.pessoaid}
                onChange={(e) =>
                  setFiltros((prev) => ({
                    ...prev,
                    pessoaid: Number(e.target.value),
                  }))
                }
              >
                <option value={0}>Filtrar por Pessoa</option>
                {pessoas.map((pessoa) => (
                  <option key={pessoa.id} value={pessoa.id}>
                    {pessoa.nome}
                  </option>
                ))}
              </FilterSelect>

              <FilterSelect
                value={filtros.finalidadeid}
                onChange={(e) =>
                  setFiltros((prev) => ({
                    ...prev,
                    finalidadeid: Number(e.target.value),
                  }))
                }
              >
                <option value={0}>Filtrar por Finalidade</option>
                {finalidades.map((finalidade) => (
                  <option key={finalidade.id} value={finalidade.id}>
                    {finalidade.nome}
                  </option>
                ))}
              </FilterSelect>
            </FiltersRow>

            <SaldoBox>
              <SaldoLabel>Saldo:</SaldoLabel>
              <SaldoValue>{formatarMoeda(saldo)}</SaldoValue>
            </SaldoBox>
          </TopRow>

          <TableHeader>
            <HeaderCellCategoria>Categoria</HeaderCellCategoria>
            <HeaderCellDescricao>Descrição</HeaderCellDescricao>
            <HeaderCellFinalidade>Finalidade</HeaderCellFinalidade>
            <HeaderCellValor>Valor</HeaderCellValor>
          </TableHeader>

          <TableBody>
            {transacoesFiltradas.map((transacao) => (
              <Row key={transacao.id}>
                <CategoriaCell>
                  <IconCircle title={transacao.categoria.descricao} />
                </CategoriaCell>

                <DescricaoCell>{transacao.descricao}</DescricaoCell>

                <FinalidadeCell>
                  <Badge>{transacao.finalidade.nome}</Badge>
                </FinalidadeCell>

                <ValorCell>{formatarMoeda(transacao.valor)}</ValorCell>
              </Row>
            ))}
          </TableBody>

          <BottomRow>
            <TotalBox>
              <TotalLabel>Total:</TotalLabel>
              <TotalValue>{formatarMoeda(total)}</TotalValue>
            </TotalBox>

            <CriarButton onClick={() => setMostrarFormulario((prev) => !prev)}>
              Criar Transação
            </CriarButton>
          </BottomRow>
        </LeftColumn>

        <RightColumn>
          {mostrarFormulario && (
            <FormPanel>
              <CriarTransacaoForm
                onCriada={() => {
                  carregarTela();
                  setMostrarFormulario(false);
                }}
              />
            </FormPanel>
          )}
        </RightColumn>
      </Content>
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 36px 42px;
  box-sizing: border-box;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 130px;
  align-items: start;
  font-family: "BeVietnamBold";
`;

const LeftColumn = styled.div`
  width: 100%;
`;

const RightColumn = styled.div`
  width: 100%;
  padding-top: 170px;
`;

const Title = styled.h1`
  margin: 0 0 34px 0;
  color: #5797FF;
  font-size: 3rem;
  font-weight: 700;
  font-family: "BeVietnamBold";
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
`;

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const FilterSelect = styled.select`
  border: none;
  background: transparent;
  color: #9c9c9c;
  font-size: 1rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
`;

const SaldoBox = styled.div`
  min-width: 245px;
  height: 72px;
  border-radius: 36px;
  background: #efefef;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const SaldoLabel = styled.span`
  color: #8c8c8c;
  font-size: 1rem;
  font-weight: 700;
`;

const SaldoValue = styled.span`
  color: #5797FF;
  font-size: 1.05rem;
  font-weight: 700;
`;

const HeaderCellCategoria = styled.div`
  color: #8c8c8c;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
`;

const HeaderCellDescricao = styled.div`
  color: #8c8c8c;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
`;

const HeaderCellFinalidade = styled.div`
  color: #8c8c8c;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
`;

const HeaderCellValor = styled.div`
  color: #8c8c8c;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
`;

const TableBody = styled.div`
  margin-top: 18px;
`;

const TableHeader = styled.div`
  width: 100%;
  height: 72px;
  border-radius: 36px;
  background: #efefef;
  display: grid;
  grid-template-columns: 90px 1.2fr 150px 120px;
  align-items: center;
  padding: 0 18px;
  box-sizing: border-box;
`;

const Row = styled.div`
  min-height: 82px;
  display: grid;
  grid-template-columns: 90px 1.2fr 150px 120px;
  align-items: center;
  padding: 0 18px;
  box-sizing: border-box;
  border-bottom: 1px solid #dddddd;
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
const CategoriaCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconCircle = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #dbe8fa;
  border: 1px solid #d1e0f5;
`;

const DescricaoCell = styled.div`
  color: #111111;
  font-size: 1.05rem;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FinalidadeCell = styled.div`
  display: flex;
  justify-content: center;
`;

const Badge = styled.div`
  min-width: 104px;
  padding: 10px 16px;
  border-radius: 999px;
  background: #d4e4f7;
  color: #5797FF;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 700;
`;

const ValorCell = styled.div`
  color: #5797FF;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
`;

const BottomRow = styled.div`
  margin-top: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalBox = styled.div`
  min-width: 220px;
  height: 72px;
  border-radius: 36px;
  background: #efefef;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const TotalLabel = styled.span`
  color: #8c8c8c;
  font-size: 1rem;
  font-weight: 700;
`;

const TotalValue = styled.span`
  color: #5797FF;
  font-size: 1.05rem;
  font-weight: 700;
`;

const CriarButton = styled.button`
  min-width: 265px;
  height: 72px;
  border-radius: 36px;
  border: 2px solid #5797FF;
  background: transparent;
  color: #5797FF;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
`;

const FormPanel = styled.div`
  width: 100%;
`;