import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FullWidthContainer } from '../../../shared/utils/styles';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  letter-spacing: -0.02em;
  
  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  background: rgba(102, 126, 234, 0.1);
  padding: 8px;
  border-radius: 16px;
  
  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
    padding: 6px;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? 'white' : '#4a5568'};
  text-decoration: none;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 12px;
  transition: ${props => props.$isActive ? 'none' : 'all 0.3s ease'};
  font-size: 0.95rem;
  background: ${props => props.$isActive 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'transparent'};
  box-shadow: ${props => props.$isActive 
    ? '0 4px 15px rgba(102, 126, 234, 0.3)' 
    : 'none'};

  &:hover {
    ${props => !props.$isActive && `
      background: rgba(102, 126, 234, 0.1);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.2);
    `}
    color: ${props => props.$isActive ? 'white' : '#4a5568'};
  }

  @media (max-width: 1024px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    text-align: center;
    border-radius: 8px;
  }
`;

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <FullWidthContainer>
        <HeaderContent>
          <Logo>Golden Raspberry Awards</Logo>
          <Nav>
            <NavLink 
              to="/" 
              $isActive={location.pathname === '/'}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/movies" 
              $isActive={location.pathname === '/movies'}
            >
              Lista de Filmes
            </NavLink>
          </Nav>
        </HeaderContent>
      </FullWidthContainer>
    </HeaderContainer>
  );
};
