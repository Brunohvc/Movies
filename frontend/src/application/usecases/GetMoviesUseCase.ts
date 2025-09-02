import { MovieRepository } from '../../domain/interfaces/MovieRepository';
import { MovieFilters, ApiResponse, Movie } from '../../shared/types';

export class GetMoviesUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(filters?: MovieFilters): Promise<ApiResponse<Movie>> {
    try {
      return await this.movieRepository.getMovies(filters);
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw new Error('Failed to fetch movies');
    }
  }
}
