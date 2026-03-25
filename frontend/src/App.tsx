import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import styled from "styled-components";
import { Sidebar } from "./shared/Sidebar/Sidebar";
import { Pessoa } from "./pages/Pessoa";
import { ListaPessoas } from "./features/listar_pessoa/ListaPessoas";
import { CriarPessoaForm } from "./features/criar_pessoa/CriaPessoaForm";
import Categoria from "./pages/Categoria";
import Transacao from "./pages/Transacao";
import {ExcluirPessoaLista} from "./features/excluir_pessoa/ExcluirPessoaLista";

const AppLayout = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

const ContentRender = styled.main`
  flex: 1;
  min-height: 100vh;
  width: 100%;
`;

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Sidebar />
        <ContentRender>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pessoa" element={<Pessoa/>} />
            <Route path="/pessoa/list-pessoa" element={<ListaPessoas/>} />
            <Route path="/create-pessoa" element={<CriarPessoaForm />} />
            <Route path="/categoria" element={<Categoria/>} />
            <Route path="/transacao" element={<Transacao/>} />
            <Route path="/delete-pessoa" element={<ExcluirPessoaLista/>} />
          </Routes>
        </ContentRender>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;