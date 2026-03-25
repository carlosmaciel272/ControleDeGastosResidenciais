import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { buscarFinalidades } from "../../entities/Finalidade/api/finalidade_api";
import type { Finalidade } from "../../entities/Finalidade/models/types";
import { criarCategoria } from "../../entities/Categoria/api/categoria_api";
import categoriIconNome from "../../assets/icons/categoriaIconNome.svg";
import finalidadeIcon from "../../assets/icons/finalidadeIcon.svg"

import BeVietnamBold from "../../assets/fonts/BeVietnamPro-Bold.ttf"
import BeVietnamMedium from "../../assets/fonts/BeVietnamPro-Medium.ttf"

type CriarCategoriaFormValues = {
  descricao: string;
  finalidadeid: number;
};

type Props = {
  onCategoriaCriada?: () => void;
};

export function CriarCategoriaForm({ onCategoriaCriada }: Props) {
  const [finalidades, setFinalidades] = useState<Finalidade[]>([]);
  const [erroGeral, setErroGeral] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CriarCategoriaFormValues>({
    mode: "onBlur",
    defaultValues: {
      descricao: "",
      finalidadeid: 0,
    },
  });

  useEffect(() => {
    async function carregarFinalidades() {
      try {
        const data = await buscarFinalidades();
        setFinalidades(data);
      } catch (error) {
        setErroGeral(
          error instanceof Error ? error.message : "Erro ao buscar finalidades."
        );
      }
    }

    carregarFinalidades();
  }, []);

  async function onSubmit(data: CriarCategoriaFormValues) {
    try {
      setErroGeral("");
      setMensagemSucesso("");

      await criarCategoria({
        descricao: data.descricao.trim(),
        finalidadeid: Number(data.finalidadeid),
      });

      setMensagemSucesso("Categoria cadastrada com sucesso!");
      reset({
        descricao: "",
        finalidadeid: 0,
      });

      onCategoriaCriada?.();
    } catch (error) {
      setErroGeral(
        error instanceof Error ? error.message : "Erro ao cadastrar categoria."
      );
    }
  }

  return (
    <FormCard>
        <GlobalFont></GlobalFont>
      <Title>Criar Categoria</Title>



      <Form onSubmit={handleSubmit(onSubmit)}>
        <FieldWrapper>
          <InputContainer>
            <IconWrapper>
              <img src={categoriIconNome} width={40}/>
            </IconWrapper>

            <StyledInput
              type="text"
              placeholder="Nome da Categoria"
              maxLength={200}
              {...register("descricao", {
                required: "O nome da categoria é obrigatório.",
                validate: {
                  naoVazio: (value) =>
                    value.trim() !== "" || "O nome da categoria não pode estar vazio.",
                  maximo200: (value) =>
                    value.trim().length <= 200 ||
                    "O nome da categoria deve ter no máximo 200 caracteres.",
                },
              })}
            />
          </InputContainer>
          {errors.descricao && <ErrorText>{errors.descricao.message}</ErrorText>}
        </FieldWrapper>

        <FieldWrapper>
          <SelectContainer>
            <IconWrapper>
                <img src={finalidadeIcon} width={40}/>
            </IconWrapper>

            <StyledSelect
              defaultValue=""
              {...register("finalidadeid", {
                required: "A finalidade é obrigatória.",
                valueAsNumber: true,
                validate: (value) =>
                  value > 0 || "Selecione uma finalidade válida.",
              })}
            >
              <option value="" disabled>
                Finalidade da Categoria
              </option>

              {finalidades.map((finalidade) => (
                <option key={finalidade.id} value={finalidade.id}>
                  {finalidade.nome}
                </option>
              ))}
            </StyledSelect>

            <ChevronWrapper>
            
            </ChevronWrapper>
          </SelectContainer>
          {errors.finalidadeid && <ErrorText>{errors.finalidadeid.message}</ErrorText>}
        </FieldWrapper>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Confirmar"}
        </SubmitButton>

        {erroGeral && <GeneralMessage $type="error">{erroGeral}</GeneralMessage>}
        {mensagemSucesso && (
          <GeneralMessage $type="success">{mensagemSucesso}</GeneralMessage>
        )}
      </Form>
    </FormCard>
  );
}

const FormCard = styled.div`
  width: 100%;
  max-width: 490px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0 0 28px 0;
  color: #5797FF;
  font-size: 3rem;
  font-weight: 700;
  font-family: "BeVietnamBold";
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 92px;
  border: 2px solid #b8b8b8;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 22px;
  box-sizing: border-box;
  background: transparent;
`;

const SelectContainer = styled.div`
  width: 100%;
  height: 92px;
  border: 2px solid #b8b8b8;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 22px;
  box-sizing: border-box;
  background: transparent;
  position: relative;
`;

const IconWrapper = styled.div`
  color: #5797FF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
  flex-shrink: 0;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1.15rem;
  font-weight: 600;
  color: #7c7c7c;

  &::placeholder {
    color: #c1c1c1;
    font-size: 1.15rem;
    font-weight: 600;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  appearance: none;
  font-size: 1.15rem;
  font-weight: 600;
  color: #7c7c7c;
  cursor: pointer;

  option {
    color: #333;
  }
`;

const ChevronWrapper = styled.div`
  position: absolute;
  right: 18px;
  color: #b8b8b8;
  pointer-events: none;
  display: flex;
  align-items: center;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 92px;
  border: none;
  border-radius: 4px;
  background: #5797FF;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  color: #d32f2f;
  font-size: 0.92rem;
`;

const GeneralMessage = styled.p<{ $type: "error" | "success" }>`
  margin: 0;
  text-align: center;
  font-size: 0.98rem;
  color: ${({ $type }) => ($type === "error" ? "#d32f2f" : "#2e7d32")};
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