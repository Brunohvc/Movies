import React from 'react';
import styled from 'styled-components';
import { Movie } from '../../../shared/types';

const Table = styled.table`
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  margin: 2rem 0;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    margin: 1.5rem 0;
    border-radius: 12px;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 16px;
  
  /* Styling para scroll horizontal */
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  }

  @media (max-width: 768px) {
    border-radius: 12px;
    
    table {
      font-size: 0.875rem;
    }
    
    th, td {
      padding: 12px 8px;
      min-width: 100px;
    }
  }

  @media (max-width: 480px) {
    table {
      font-size: 0.8rem;
    }
    
    th, td {
      padding: 10px 6px;
      min-width: 80px;
    }
  }
`;

const WinnerBadge = styled.span<{ $isWinner: boolean }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  background: ${props => props.$isWinner 
    ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' 
    : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)'};
  color: ${props => props.$isWinner ? 'white' : '#4a5568'};
  box-shadow: ${props => props.$isWinner 
    ? '0 2px 8px rgba(72, 187, 120, 0.3)' 
    : '0 2px 4px rgba(0, 0, 0, 0.1)'};

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 0.8rem;
    min-width: 50px;
  }
`;

interface Props {
  movies: Movie[];
  loading?: boolean;
}

export const MovieTable: React.FC<Props> = ({ movies, loading }) => {
  if (loading) {
    return (
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ano</th>
              <th>Título</th>
              <th>Estúdios</th>
              <th>Produtores</th>
              <th>Vencedor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                Carregando filmes...
              </td>
            </tr>
          </tbody>
        </Table>
      </TableContainer>
    );
  }

  if (movies.length === 0) {
    return (
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ano</th>
              <th>Título</th>
              <th>Estúdios</th>
              <th>Produtores</th>
              <th>Vencedor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
                Nenhum filme encontrado
              </td>
            </tr>
          </tbody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ano</th>
            <th>Título</th>
            <th>Estúdios</th>
            <th>Produtores</th>
            <th>Vencedor</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.year}</td>
              <td>{movie.title}</td>
              <td>{movie.studios.join(', ')}</td>
              <td>{movie.producers.join(', ')}</td>
              <td>
                <WinnerBadge $isWinner={movie.winner}>
                  {movie.winner ? 'Sim' : 'Não'}
                </WinnerBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};
