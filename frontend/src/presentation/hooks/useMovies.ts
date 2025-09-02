import { useState, useEffect } from 'react';
import { MovieService } from '../../application/services/MovieService';
import { Movie, ApiResponse, MovieFilters } from '../../shared/types';

export const useMovies = (initialFilters?: MovieFilters) => {
  const [movies, setMovies] = useState<ApiResponse<Movie> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const movieService = new MovieService();

  const fetchMovies = async (customFilters?: MovieFilters) => {
    setLoading(true);
    setError(null);
    try {
      const filtersToUse = customFilters || initialFilters || { page: 0, size: 20 };
      const result = await movieService.movies.execute(filtersToUse);
      setMovies(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Remove useEffect automático - será controlado pelo componente

  return {
    movies,
    loading,
    error,
    refetch: fetchMovies,
  };
};
