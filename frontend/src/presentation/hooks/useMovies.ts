import { useState, useMemo, useCallback } from 'react';
import { MovieService } from '../../application/services/MovieService';
import { Movie, ApiResponse, MovieFilters } from '../../shared/types';

export const useMovies = () => {
  const [movies, setMovies] = useState<ApiResponse<Movie> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const movieService = useMemo(() => new MovieService(), []);

  const fetchMovies = useCallback(async (filters: MovieFilters = { page: 0, size: 20 }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await movieService.movies.execute(filters);
      setMovies(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [movieService]);

  return {
    movies,
    loading,
    error,
    refetch: fetchMovies,
  };
};
