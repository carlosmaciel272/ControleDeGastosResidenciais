import styled from "styled-components";
import { NavLink } from "react-router-dom";

import homeIcon from "../../assets/icons/homeIcon.svg";
import pessoaIcon from "../../assets/icons/pessoaIcon.svg";
import transacaoIcon from "../../assets/icons/transacaoIcon.svg";
import categoriaIcon from "../../assets/icons/categoriaIcon.svg";

const SideLayout = styled.aside`
  width: 142px;
  min-height: 100vh;
  background-color: #5797FF;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding-top: 120px;
  box-sizing: border-box;
`;

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 42px;
`;

const MenuLink = styled(NavLink)`
  text-decoration: none;
`;

const IconWrapper = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;
   margin-bottom: 30px;

  ${MenuLink}.active & {
    background-color: rgba(255, 255, 255, 0.18);
  }
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

export function Sidebar() {
  return (
    <SideLayout>
      <NavContainer>
        <MenuLink to="/" end>
          <IconWrapper>
            <Icon src={homeIcon} alt="Home" />
          </IconWrapper>
        </MenuLink>

        <MenuLink to="/pessoa">
          <IconWrapper>
            <Icon src={pessoaIcon} alt="Pessoas" />
          </IconWrapper>
        </MenuLink>

        <MenuLink to="/transacao">
          <IconWrapper>
            <Icon src={transacaoIcon} alt="Transações" />
          </IconWrapper>
        </MenuLink>

        <MenuLink to="/categoria">
          <IconWrapper>
            <Icon src={categoriaIcon} alt="Categorias" />
          </IconWrapper>
        </MenuLink>
      </NavContainer>
    </SideLayout>
  );
}

