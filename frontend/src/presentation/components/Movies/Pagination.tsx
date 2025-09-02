import React from 'react';
import styled from 'styled-components';
import { Button } from '../../../shared/utils/styles';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 1024px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    padding: 1.25rem;
  }

  @media (max-width: 480px) {
    margin-top: 1rem;
    padding: 1rem;
  }
`;

const PaginationInfo = styled.div`
  color: #4a5568;
  font-size: 0.95rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const PageButton = styled(Button)<{ $isActive?: boolean }>`
  padding: 10px 14px;
  min-width: 44px;
  background: ${props => props.$isActive 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'white'};
  color: ${props => props.$isActive ? 'white' : '#4a5568'};
  border: 2px solid ${props => props.$isActive ? 'transparent' : '#e2e8f0'};
  font-weight: 600;
  border-radius: 12px;
  
  &:hover:not(:disabled) {
    background: ${props => props.$isActive 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : '#f7fafc'};
    border-color: ${props => props.$isActive ? 'transparent' : '#cbd5e0'};
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    min-width: 40px;
    font-size: 0.875rem;
  }
`;

interface Props {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  onPageChange,
}) => {
  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

  const getVisiblePages = () => {
    const delta = 2; // Número de páginas para mostrar antes e depois da atual
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(0, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (range[0] > 0) {
      if (range[0] > 1) {
        rangeWithDots.push(0, -1); // -1 representa "..."
      } else {
        rangeWithDots.push(0);
      }
    }

    rangeWithDots.push(...range);

    if (range[range.length - 1] < totalPages - 1) {
      if (range[range.length - 1] < totalPages - 2) {
        rangeWithDots.push(-1, totalPages - 1); // -1 representa "..."
      } else {
        rangeWithDots.push(totalPages - 1);
      }
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationContainer>
      <PaginationInfo>
        Mostrando {startItem} - {endItem} de {totalElements} itens
      </PaginationInfo>
      
      <PaginationControls>
        <PageButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          ←
        </PageButton>
        
        {getVisiblePages().map((page, index) => (
          page === -1 ? (
            <span key={`dots-${index}`} style={{ padding: '8px 4px', color: '#6c757d' }}>
              ...
            </span>
          ) : (
            <PageButton
              key={page}
              $isActive={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page + 1}
            </PageButton>
          )
        ))}
        
        <PageButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          →
        </PageButton>
      </PaginationControls>
    </PaginationContainer>
  );
};
