import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import nomeIcon from "../../assets/icons/nomeIcon.svg"
import idadeIcon from "../../assets/icons/idadeIcon.svg"
import { criarPessoa } from "../../entities/Pessoa/api/pessoa_api.ts";
import BeVietnamBold from "../../assets/fonts/BeVietnamPro-Bold.ttf"
import BeVietnamMedium from "../../assets/fonts/BeVietnamPro-Medium.ttf"

type CriarPessoaFormValues = {
  nome: string;
  idade: number;
};

export function CriarPessoaForm() {
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CriarPessoaFormValues>({
    mode: "onBlur",
    defaultValues: {
      nome: "",
      idade: undefined,
    },
  });

  async function onSubmit(data: CriarPessoaFormValues) {
    try {
      setMensagemSucesso("");

      await criarPessoa({
        nome: data.nome.trim(),
        idade: Number(data.idade),
      });

      setMensagemSucesso("Pessoa cadastrada com sucesso!");
      reset();
    } catch (error) {
      setError("root", {
        type: "server",
        message:
          error instanceof Error ? error.message : "Erro ao cadastrar pessoa.",
      });
    }
  }

  return (
    <GlobalFont>
    <PageContainer>
      <FormWrapper>
        <Title>Adicionar Pessoa</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FieldWrapper>
            <InputContainer>
              <IconWrapper>
                <img src={nomeIcon} width={45}/>
              </IconWrapper>

              <StyledInput
                type="text"
                placeholder="Digite seu nome"
                maxLength={200}
                {...register("nome", {
                  required: "O nome é obrigatório.",
                  validate: {
                    naoVazio: (value) =>
                      value.trim() !== "" || "O nome não pode estar vazio.",
                    maximo200: (value) =>
                      value.trim().length <= 200 ||
                      "O nome deve ter no máximo 200 caracteres.",
                  },
                })}
              />
            </InputContainer>

            {errors.nome && <ErrorText>{errors.nome.message}</ErrorText>}
          </FieldWrapper>

          <FieldWrapper>
            <InputContainer>
              <IconWrapper>
               <img src={idadeIcon} width={45}/>
              </IconWrapper>

              <StyledInput
                type="number"
                placeholder="Digite sua Idade"
                {...register("idade", {
                  required: "A idade é obrigatória.",
                  valueAsNumber: true,
                  validate: {
                    numeroValido: (value) =>
                      !Number.isNaN(value) || "A idade deve ser um número.",
                    positivo: (value) =>
                      value > 0 || "A idade deve ser um número positivo.",
                    inteiro: (value) =>
                      Number.isInteger(value) ||
                      "A idade deve ser um número inteiro.",
                  },
                })}
              />
            </InputContainer>

            {errors.idade && <ErrorText>{errors.idade.message}</ErrorText>}
          </FieldWrapper>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Confirmar"}
          </SubmitButton>

          {errors.root?.message && (
            <GeneralMessage $type="error">{errors.root.message}</GeneralMessage>
          )}

          {mensagemSucesso && (
            <GeneralMessage $type="success">{mensagemSucesso}</GeneralMessage>
          )}
        </Form>
      </FormWrapper>
    </PageContainer>
    </GlobalFont>
  );
}

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0 0 36px 0;
  color: #5797FF;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  font-family: "BeVietnamBold";
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 120px;
  border: 3px solid #b8b8b8;
  border-radius: 8px;
  background: transparent;
  display: flex;
  align-items: center;
  padding: 0 28px;
  box-sizing: border-box;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5b73f2;
  margin-right: 18px;
  flex-shrink: 0;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 2rem;
  font-weight: 600;
  color: #8d8d8d;

  &::placeholder {
    color: #b9b9b9;
    font-size: 28px;
    font-weight: 600;
  }

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 120px;
  border: none;
  border-radius: 8px;
  background: #5797FF;
  color: white;
  font-size: 2rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.92;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  color: #d32f2f;
  font-size: 0.95rem;
  margin-left: 4px;
`;

const GeneralMessage = styled.p<{ $type: "error" | "success" }>`
  margin: 0;
  text-align: center;
  font-size: 1rem;
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