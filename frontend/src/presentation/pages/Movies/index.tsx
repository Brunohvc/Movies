import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Layout } from '../../components/Layout';
import { MovieTable } from '../../components/Movies/MovieTable';
import { Pagination } from '../../components/Movies/Pagination';
import { MovieFilters } from '../../components/Movies/MovieFilters';
import { useMovies } from '../../hooks/useMovies';
import { ErrorMessage } from '../../../shared/utils/styles';
import { MovieFilters as Filters } from '../../../shared/types';
import { DEFAULT_PAGE_SIZE } from '../../../shared/constants';

const PageTitle = styled.h1`
  margin-bottom: 3rem;
  color: white;
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;

  @media (max-width: 1024px) {
    font-size: 2.5rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
`;

const MoviesContainer = styled.div`
  min-height: calc(100vh - 200px);
  padding: 2rem 0;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

export const Movies: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    page: 0,
    size: DEFAULT_PAGE_SIZE,
  });

  const { movies, loading, error, refetch } = useMovies();

  useEffect(() => {
    refetch(filters);
  }, [filters]);

  const handleFiltersChange = useCallback((newFilters: Filters) => {
    setFilters({
      ...newFilters,
      size: DEFAULT_PAGE_SIZE,
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({
      ...prev,
      page,
    }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      page: 0,
      size: DEFAULT_PAGE_SIZE,
    });
  }, []);

  return (
    <Layout>
      <MoviesContainer>
        <PageTitle>Lista de Filmes</PageTitle>
        
        <MovieFilters 
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
          loading={loading}
        />

        {error && (
          <ErrorMessage>
            Erro ao carregar filmes: {error}
          </ErrorMessage>
        )}

        <MovieTable 
          movies={movies?.content || []} 
          loading={loading}
        />

        {movies && (
          <Pagination
            currentPage={movies.number}
            totalPages={movies.totalPages}
            totalElements={movies.totalElements}
            pageSize={movies.size}
            onPageChange={handlePageChange}
          />
        )}
      </MoviesContainer>
    </Layout>
  );
};
