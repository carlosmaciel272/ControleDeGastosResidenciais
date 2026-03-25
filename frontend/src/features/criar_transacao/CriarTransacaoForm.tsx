import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { criarTransacao } from "../../entities/Transacao/api/transacao_api";
import { BuscarPessoas } from "../../entities/Pessoa/api/pessoa_api";
import { buscarCategorias } from "../../entities/Categoria/api/categoria_api";
import { buscarFinalidades } from "../../entities/Finalidade/api/finalidade_api";
import type { Pessoa } from "../../entities/Pessoa/models/types";
import type { Categoria } from "../../entities/Categoria/models/types";
import type { Finalidade } from "../../entities/Finalidade/models/types";


type FormValues = {
  descricao:string;
  pessoaid: number;
  finalidadeid: number;
  categoriaid: number;
  valorTexto: string;
};

type Props = {
  onCriada?: () => void;
};

export function CriarTransacaoForm({ onCriada }: Props) {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [finalidades, setFinalidades] = useState<Finalidade[]>([]);
  const [erroGeral, setErroGeral] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
        descricao:"",
      pessoaid: 0,
      finalidadeid: 0,
      categoriaid: 0,
      valorTexto: "",
    },
  });

  const pessoaid = Number(watch("pessoaid"));
  const finalidadeid = Number(watch("finalidadeid"));

  const pessoaSelecionada = useMemo(
    () => pessoas.find((p) => p.id === pessoaid),
    [pessoas, pessoaid]
  );

  const finalidadesPermitidas = useMemo(() => {
    if (!pessoaSelecionada) return finalidades;

    if (pessoaSelecionada.idade < 18) {
      return finalidades.filter(
        (f) => f.nome.toLowerCase() !== "receita"
      );
    }

    return finalidades;
  }, [finalidades, pessoaSelecionada]);

  const categoriasFiltradas = useMemo(() => {
    if (!finalidadeid) return [];
    return categorias.filter((c) => c.finalidadeid === finalidadeid);
  }, [categorias, finalidadeid]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [pessoasData, categoriasData, finalidadesData] = await Promise.all([
          BuscarPessoas(),
          buscarCategorias(),
          buscarFinalidades(),
        ]);

        setPessoas(pessoasData);
        setCategorias(categoriasData);
        setFinalidades(finalidadesData);
      } catch (error) {
        setErroGeral(
          error instanceof Error ? error.message : "Erro ao carregar formulário."
        );
      }
    }

    carregarDados();
  }, []);

  useEffect(() => {
    setValue("categoriaid", 0);
  }, [finalidadeid, setValue]);

  useEffect(() => {
    const finalidadeSelecionada = finalidades.find((f) => f.id === finalidadeid);

    if (
      pessoaSelecionada &&
      pessoaSelecionada.idade < 18 &&
      finalidadeSelecionada?.nome.toLowerCase() === "receita"
    ) {
      setValue("finalidadeid", 0);
      setValue("categoriaid", 0);
    }
  }, [pessoaSelecionada, finalidadeid, finalidades, setValue]);

  function formatarInputMoeda(valor: string) {
    const numeros = valor.replace(/\D/g, "");
    const valorNumerico = Number(numeros) / 100;

    return valorNumerico.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function converterMoedaParaNumero(valorTexto: string) {
    const limpo = valorTexto.replace(/[^\d,]/g, "").replace(",", ".");
    return Number(limpo);
  }

  async function onSubmit(data: FormValues) {
    try {
      setErroGeral("");

      const valor = converterMoedaParaNumero(data.valorTexto);

      await criarTransacao({
        descricao:data.descricao.trim(),
        pessoaid: Number(data.pessoaid),
        finalidadeid: Number(data.finalidadeid),
        categoriaid: Number(data.categoriaid),
        valor,
      });

      reset({
        descricao:"",
        pessoaid: 0,
        finalidadeid: 0,
        categoriaid: 0,
        valorTexto: "",
      });

      onCriada?.();
    } catch (error) {
      setErroGeral(
        error instanceof Error ? error.message : "Erro ao criar transação."
      );
    }
  }

  return (
    <Wrapper>
      <Title>Criar Transação</Title>

      <Form onSubmit={handleSubmit(onSubmit)}>

        <FieldBox>
  <IconWrap></IconWrap>
  <Input
    placeholder="Descrição da Transação"
    {...register("descricao", {
      required: "A descrição é obrigatória.",
      validate: (value) =>
        value.trim() !== "" || "A descrição não pode estar vazia.",
    })}
  />
</FieldBox>
{errors.descricao && <ErrorText>{errors.descricao.message}</ErrorText>}
        <FieldBox>
          <IconWrap> </IconWrap>
          <Select
            {...register("pessoaid", {
              valueAsNumber: true,
              validate: (value) => value > 0 || "Selecione a pessoa.",
            })}
          >
            <option value={0}>Selecione a Pessoa</option>
            {pessoas.map((pessoa) => (
              <option key={pessoa.id} value={pessoa.id}>
                {pessoa.nome}
              </option>
            ))}
          </Select>
        </FieldBox>
        {errors.pessoaid && <ErrorText>{errors.pessoaid.message}</ErrorText>}

        <FieldBox>
          <IconWrap> </IconWrap>
          <Select
            {...register("finalidadeid", {
              valueAsNumber: true,
              validate: (value) => value > 0 || "Selecione a finalidade.",
            })}
          >
            <option value={0}>Selecione a Finalidade</option>
            {finalidadesPermitidas.map((finalidade) => (
              <option key={finalidade.id} value={finalidade.id}>
                {finalidade.nome}
              </option>
            ))}
          </Select>
        </FieldBox>
        {errors.finalidadeid && <ErrorText>{errors.finalidadeid.message}</ErrorText>}

        <FieldBox>
          <IconWrap></IconWrap>
          <Select
            {...register("categoriaid", {
              valueAsNumber: true,
              validate: (value) => value > 0 || "Selecione a categoria.",
            })}
          >
            <option value={0}>Selecione a Categoria</option>
            {categoriasFiltradas.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.descricao}
              </option>
            ))}
          </Select>
        </FieldBox>
        {errors.categoriaid && <ErrorText>{errors.categoriaid.message}</ErrorText>}

        <FieldBox>
          <IconWrap></IconWrap>
          <Input
            placeholder="Digite o Valor"
            {...register("valorTexto", {
              validate: (value) => {
                const numero = converterMoedaParaNumero(value);
                return numero > 0 || "Digite um valor válido.";
              },
              onChange: (e) => {
                e.target.value = formatarInputMoeda(e.target.value);
              },
            })}
          />
        </FieldBox>
        {errors.valorTexto && <ErrorText>{errors.valorTexto.message}</ErrorText>}

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Confirmar"}
        </SubmitButton>

        {erroGeral && <ErrorText>{erroGeral}</ErrorText>}
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  color: #5797FF;
  font-size: 2.1rem;
  font-weight: 700;
  margin: 0 0 22px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FieldBox = styled.div`
  width: 100%;
  height: 70px;
  border: 2px solid #d4d4d4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 18px;
  box-sizing: border-box;
`;

const IconWrap = styled.div`
  color: #5b73f2;
  margin-right: 12px;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: #999;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: #999;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 72px;
  border: none;
  border-radius: 36px;
  background: #5797FF;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
`;

const ErrorText = styled.p`
  margin: -8px 0 0 0;
  color: #d32f2f;
  font-size: 0.9rem;
`;