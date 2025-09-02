import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Card, Input, Button } from '../../../shared/utils/styles';
import { WinnerByYear } from '../../../shared/types';

const Title = styled.h3`
  margin-bottom: 2rem;
  color: #1a202c;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  align-items: flex-end;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  padding: 2rem;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  
  @media (max-width: 1024px) {
    padding: 1.5rem;
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 1.25rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const InputContainer = styled.div`
  flex: 1;
  max-width: 250px;
  
  @media (max-width: 768px) {
    max-width: none;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #1a202c;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Table = styled.table`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    table {
      font-size: 0.875rem;
    }
    
    th, td {
      padding: 12px 8px;
      min-width: 80px;
    }
  }

  @media (max-width: 480px) {
    table {
      font-size: 0.8rem;
    }
    
    th, td {
      padding: 10px 6px;
      min-width: 70px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

interface Props {
  data: WinnerByYear[];
  onSearch: (year: number) => void;
  onClear?: () => void;
  loading?: boolean;
}

export const WinnersByYearCard: React.FC<Props> = ({ data, onSearch, onClear, loading }) => {
  const [year, setYear] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [lastSearchedYear, setLastSearchedYear] = useState<string>('');
  const debounceTimer = useRef<number | null>(null);

  // Debouncing effect - 750ms delay
  useEffect(() => {
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // If field is empty, clear results
    if (year.trim() === '') {
      setHasSearched(false);
      setLastSearchedYear('');
      if (onClear) {
        onClear();
      }
      return;
    }

    // Only search if the year has changed and is different from last searched
    if (year !== lastSearchedYear) {
      debounceTimer.current = setTimeout(() => {
        const yearNumber = parseInt(year);
        if (yearNumber && yearNumber > 1900 && yearNumber <= new Date().getFullYear()) {
          onSearch(yearNumber);
          setHasSearched(true);
          setLastSearchedYear(year);
        }
      }, 750);
    }

    // Cleanup function
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [year, lastSearchedYear, onSearch, onClear]);

  const handleSearch = () => {
    const yearNumber = parseInt(year);
    if (yearNumber && yearNumber > 1900 && yearNumber <= new Date().getFullYear()) {
      onSearch(yearNumber);
      setHasSearched(true);
      setLastSearchedYear(year);
    }
  };

  const handleClear = () => {
    setYear('');
    setHasSearched(false);
    setLastSearchedYear('');
    if (onClear) {
      onClear();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card>
      <Title>Vencedores por ano</Title>
      
      <SearchContainer>
        <InputContainer>
          <Label htmlFor="year-search">Pesquisar por ano</Label>
          <Input
            id="year-search"
            type="number"
            placeholder="Ex: 2000"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            onKeyPress={handleKeyPress}
            min="1900"
            max={new Date().getFullYear()}
          />
        </InputContainer>
        <ButtonGroup>
          <Button 
            variant="primary" 
            onClick={handleSearch}
            disabled={loading || !year}
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </Button>
          {hasSearched && (
            <Button 
              variant="secondary" 
              onClick={handleClear}
              disabled={loading}
            >
              Limpar
            </Button>
          )}
        </ButtonGroup>
      </SearchContainer>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ano</th>
              <th>Título</th>
              <th>Estúdios</th>
              <th>Produtores</th>
            </tr>
          </thead>
          <tbody>
            {data.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.year}</td>
                <td>{movie.title}</td>
                <td>{movie.studios.join(', ')}</td>
                <td>{movie.producers.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      {data.length === 0 && hasSearched && (
        <p style={{ textAlign: 'center', color: '#6c757d', marginTop: '1rem' }}>
          Nenhum vencedor encontrado para o ano {year}
        </p>
      )}

      {data.length === 0 && !hasSearched && (
        <p style={{ textAlign: 'center', color: '#6c757d', marginTop: '1rem' }}>
          Digite um ano para buscar automaticamente os vencedores
        </p>
      )}
    </Card>
  );
};
