CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE public."Finalidade" (
    id int4 GENERATED ALWAYS AS IDENTITY
        (INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
    nome varchar NOT NULL,
    CONSTRAINT finalidade_pk PRIMARY KEY (id)
);

CREATE TABLE public."Pessoa" (
    id int4 GENERATED ALWAYS AS IDENTITY
        (INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
    nome varchar NOT NULL,
    idade int4 NOT NULL,
    CONSTRAINT pk_pessoa PRIMARY KEY (id)
);

CREATE TABLE public."Categoria" (
    id int4 GENERATED ALWAYS AS IDENTITY
        (INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
    descricao varchar(400) NOT NULL,
    finalidadeid int4 NOT NULL,
    CONSTRAINT categoria_pk PRIMARY KEY (id),
    CONSTRAINT fk_categoria_finalidade
        FOREIGN KEY (finalidadeid) REFERENCES public."Finalidade"(id)
);

CREATE TABLE public."Transacao" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    descricao varchar(400) NOT NULL,
    valor numeric(18, 2) NOT NULL,
    finalidadeid int4 NOT NULL,
    categoriaid int4 NOT NULL,
    pessoaid int4 NOT NULL,
    CONSTRAINT ck_transacao_finalidade CHECK ((finalidadeid = ANY (ARRAY[1, 2]))),
    CONSTRAINT ck_transacao_valor_positivo CHECK ((valor > (0)::numeric)),
    CONSTRAINT pk_transacao PRIMARY KEY (id),
    CONSTRAINT fk_transacao_categoria
        FOREIGN KEY (categoriaid) REFERENCES public."Categoria"(id),
    CONSTRAINT fk_transacao_finalidade
        FOREIGN KEY (finalidadeid) REFERENCES public."Finalidade"(id),
    CONSTRAINT fk_transacao_pessoa
        FOREIGN KEY (pessoaid) REFERENCES public."Pessoa"(id)
);

INSERT INTO public."Finalidade" (nome)
VALUES
    ('Receita'),
    ('Despesa'),
    ('Ambas');
