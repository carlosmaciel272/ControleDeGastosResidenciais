import styled from "styled-components";
import imgHome from "../assets/images/imgHome.svg";
import BeVietnamBold from "../assets/fonts/BeVietnamPro-Bold.ttf"
import BeVietnamMedium from "../assets/fonts/BeVietnamPro-Medium.ttf"

const HomePageLayout = styled.div`
  display: flex;
  background-color: #DFEFFF;
  padding:150px 150px 0px 0px;
  color:#1D85E8;
  gap: 100px;
`

const HomePageDesc = styled.div`
 padding-left: 360px;
flex: 4


`

const HomePageImg = styled.div`

flex: 1


`
const HomePageText = styled.p`
  text-align: justify;
  font-size: 18px;
  line-height: 1.6;
  margin-top: 20px;
  max-width: 500px;
  font-family: 'BeVietnamMedium', sans-serif;
  color: #5382AF;
`;

const Title = styled.h1`
  font-family: 'BeVietnamBold', sans-serif;
  font-size:50px;
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

export function HomePage() {
  
  return (
    <div>
      
    <GlobalFont>
       <HomePageLayout>
          <HomePageDesc>
            <Title>Controle de Gastos <br></br> Residencias</Title>   
            <HomePageText>
              Este sistema foi desenvolvido para trazer organização para as 
              finanças do seu lar. Com ele, você pode registrar todos os gastos 
              da sua residência, categorizá-los e acompanhá-los. 
            </HomePageText>
          </HomePageDesc>
          <HomePageImg>
            <img src={imgHome} width={600} alt="Home" />
          </HomePageImg>
        </HomePageLayout>
    </GlobalFont>

    </div>
  );
}