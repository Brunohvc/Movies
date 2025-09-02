import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Input, Select, Button } from '../../../shared/utils/styles';
import { MovieFilters as Filters } from '../../../shared/types';

const FilterCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  padding: 32px;
  margin-bottom: 32px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);

  @media (max-width: 1024px) {
    padding: 28px;
    margin-bottom: 28px;
  }

  @media (max-width: 768px) {
    padding: 24px;
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    margin-bottom: 20px;
  }
`;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 2rem;
  align-items: end;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  
  @media (max-width: 1024px) {
    grid-column: 1 / -1;
    justify-content: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
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

interface Props {
  onFiltersChange: (filters: Filters) => void;
  onClearFilters?: () => void;
  loading?: boolean;
}

export const MovieFilters: React.FC<Props> = ({ onFiltersChange, onClearFilters, loading }) => {
  const [year, setYear] = useState<string>('');
  const [winner, setWinner] = useState<string>('');
  const [hasAppliedFilters, setHasAppliedFilters] = useState<boolean>(false);
  const [lastAppliedFilters, setLastAppliedFilters] = useState<string>('');
  const debounceTimer = useRef<number | null>(null);

  // Função para criar os filtros baseado nos valores atuais
  const createFilters = (yearValue: string, winnerValue: string): Filters => {
    const filters: Filters = {
      page: 0, // Reset para primeira página ao aplicar filtros
    };

    if (yearValue) {
      const yearNumber = parseInt(yearValue);
      if (yearNumber > 0) {
        filters.year = yearNumber;
      }
    }

    if (winnerValue !== '') {
      filters.winner = winnerValue === 'true';
    }

    return filters;
  };

  // Debouncing effect - 750ms delay
  useEffect(() => {
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Create a string representation of current filters for comparison
    const currentFiltersString = `${year}-${winner}`;

    // If both fields are empty, clear results
    if (year.trim() === '' && winner === '') {
      if (hasAppliedFilters) {
        setHasAppliedFilters(false);
        setLastAppliedFilters('');
        if (onClearFilters) {
          onClearFilters();
        } else {
          onFiltersChange({ page: 0 });
        }
      }
      return;
    }

    // Only apply filters if they have changed and are different from last applied
    if (currentFiltersString !== lastAppliedFilters) {
      debounceTimer.current = setTimeout(() => {
        const filters = createFilters(year, winner);
        onFiltersChange(filters);
        setHasAppliedFilters(true);
        setLastAppliedFilters(currentFiltersString);
      }, 750);
    }

    // Cleanup function
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [year, winner, lastAppliedFilters, hasAppliedFilters, onFiltersChange, onClearFilters]);

  const handleApplyFilters = () => {
    const filters = createFilters(year, winner);
    onFiltersChange(filters);
    setHasAppliedFilters(true);
    setLastAppliedFilters(`${year}-${winner}`);
  };

  const handleClearFilters = () => {
    setYear('');
    setWinner('');
    setHasAppliedFilters(false);
    setLastAppliedFilters('');
    if (onClearFilters) {
      onClearFilters();
    } else {
      onFiltersChange({ page: 0 });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyFilters();
    }
  };

  return (
    <FilterCard>
      <h3 style={{ 
        marginBottom: '2rem', 
        color: '#1a202c', 
        fontSize: '1.5rem',
        fontWeight: '700',
        textAlign: 'center'
      }}>
        Filtros de Busca
      </h3>
      
      <FiltersContainer>
        <FilterGroup>
          <Label htmlFor="year-filter">Ano</Label>
          <Input
            id="year-filter"
            type="number"
            placeholder="Ex: 2000"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            onKeyPress={handleKeyPress}
            min="1900"
            max={new Date().getFullYear()}
          />
        </FilterGroup>

        <FilterGroup>
          <Label htmlFor="winner-filter">Vencedor</Label>
          <Select
            id="winner-filter"
            value={winner}
            onChange={(e) => setWinner(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </Select>
        </FilterGroup>

        <ButtonGroup>
          <Button
            variant="primary"
            onClick={handleApplyFilters}
            disabled={loading}
          >
            {loading ? 'Aplicando...' : 'Aplicar'}
          </Button>
          <Button
            variant="secondary"
            onClick={handleClearFilters}
            disabled={loading}
          >
            Limpar
          </Button>
        </ButtonGroup>
      </FiltersContainer>
    </FilterCard>
  );
};
