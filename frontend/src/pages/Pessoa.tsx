import { Cards } from "../shared/Cards/Cards";
import styled from "styled-components";
import imgPessoa from "../assets/images/imgPessoa.svg"
const PessoaLayout = styled.div`



`
const PessoaDescription = styled.div`
display: flex;
`

const PessoaImg = styled.img`
  width: 500px;
  height: auto;
  margin-left: 300px;
  margin-bottom:50px;
  margin-top:50px;
`;
const PessoaTitle = styled.div`
flex: 1;

`
export function Pessoa(){
    return(
        <PessoaLayout>
            <PessoaDescription>
                <PessoaImg src={imgPessoa} width={10}/>
                <PessoaTitle></PessoaTitle>
            </PessoaDescription>
            <Cards/>
        </PessoaLayout>
    )
}