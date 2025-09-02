import React from 'react';
import styled from 'styled-components';
import { Header } from '../Header';
import { FullWidthContainer } from '../../../shared/utils/styles';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 0;
  
  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <FullWidthContainer>
          {children}
        </FullWidthContainer>
      </Main>
    </LayoutContainer>
  );
};
