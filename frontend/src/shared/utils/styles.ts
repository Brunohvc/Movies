import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-attachment: fixed;
    color: #2d3748;
    line-height: 1.6;
    font-size: 16px;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    font-weight: 700;
    color: #1a202c;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 1rem;
    color: #4a5568;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
    transition: all 0.3s ease;
  }

  input, select {
    outline: none;
    font-family: inherit;
    transition: all 0.3s ease;
    color: #2d3748 !important;
  }

  input::placeholder {
    color: #a0aec0 !important;
  }

  select option {
    color: #2d3748 !important;
    background: white !important;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  th, td {
    text-align: left;
    padding: 16px;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background: white;
    color: #4a5568;
    font-weight: 600;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-right: 1px solid #e2e8f0;
    position: relative;
  }

  th:last-child {
    border-right: none;
  }

  td {
    color: #4a5568;
  }

  tr:hover {
    background-color: #f7fafc;
  }

  /* Breakpoints */
  @media (max-width: 1200px) {
    body {
      font-size: 15px;
    }
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
    
    h1 {
      font-size: 2rem;
    }
    
    h2 {
      font-size: 1.75rem;
    }
    
    h3 {
      font-size: 1.25rem;
    }
    
    th, td {
      padding: 12px 8px;
      font-size: 0.875rem;
    }
  }

  @media (max-width: 480px) {
    body {
      font-size: 13px;
    }
    
    h1 {
      font-size: 1.75rem;
    }
    
    h2 {
      font-size: 1.5rem;
    }
    
    h3 {
      font-size: 1.125rem;
    }
    
    th, td {
      padding: 10px 6px;
      font-size: 0.8rem;
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 1200px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem;
  }
`;

export const FullWidthContainer = styled.div`
  width: 100%;
  min-width: 100vw;
  margin: 0;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.25rem;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  padding: 32px;
  margin-bottom: 32px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 1024px) {
    padding: 28px;
    margin-bottom: 28px;
  }

  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 8px;
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }
    
    &:active {
      transform: translateY(0);
    }
  ` : `
    background: white;
    color: #4a5568;
    border: 2px solid #e2e8f0;
    
    &:hover {
      border-color: #cbd5e0;
      background-color: #f7fafc;
      transform: translateY(-1px);
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 1024px) {
    padding: 12px 24px;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.875rem;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 0.8rem;
    width: 100%;
  }
`;

export const Input = styled.input`
  padding: 14px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  width: 100%;
  background: white;
  color: #2d3748;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);

  &::placeholder {
    color: #a0aec0;
  }

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
    color: #1a202c;
  }

  &:hover {
    border-color: #cbd5e0;
  }

  @media (max-width: 1024px) {
    padding: 12px 16px;
  }

  @media (max-width: 768px) {
    padding: 12px 14px;
    font-size: 16px; /* Evita zoom no iOS */
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
  }
`;

export const Select = styled.select`
  padding: 14px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  width: 100%;
  background: white;
  color: #2d3748;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);

  option {
    color: #2d3748;
    background: white;
  }

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
    color: #1a202c;
  }

  &:hover {
    border-color: #cbd5e0;
  }

  @media (max-width: 1024px) {
    padding: 12px 16px;
  }

  @media (max-width: 768px) {
    padding: 12px 14px;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(102, 126, 234, 0.2);
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ErrorMessage = styled.div`
  color: #e53e3e;
  background: linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%);
  border: 2px solid #fc8181;
  border-radius: 12px;
  padding: 16px 20px;
  margin: 20px 0;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(229, 62, 62, 0.15);

  @media (max-width: 768px) {
    padding: 14px 16px;
    border-radius: 8px;
  }
`;

export const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  gap: 32px;

  @media (max-width: 1200px) {
    gap: 28px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;
