import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetMoviesUseCase } from '../../application/usecases/GetMoviesUseCase';
import { MovieRepository } from '../../domain/interfaces/MovieRepository';
import { ApiResponse, Movie } from '../../shared/types';

const mockMovieRepository: MovieRepository = {
  getMovies: vi.fn(),
  getYearsWithMultipleWinners: vi.fn(),
  getStudiosWithWinCount: vi.fn(),
  getProducerIntervals: vi.fn(),
  getWinnersByYear: vi.fn(),
};

const mockApiResponse: ApiResponse<Movie> = {
  content: [
    {
      id: 1,
      year: 2000,
      title: 'Test Movie',
      studios: ['Studio A'],
      producers: ['Producer A'],
      winner: true,
    },
  ],
  pageable: {
    sort: { sorted: false, unsorted: true },
    pageSize: 20,
    pageNumber: 0,
    offset: 0,
    paged: true,
    unpaged: false,
  },
  totalElements: 1,
  last: true,
  totalPages: 1,
  first: true,
  sort: { sorted: false, unsorted: true },
  number: 0,
  numberOfElements: 1,
  size: 20,
};

describe('GetMoviesUseCase', () => {
  let useCase: GetMoviesUseCase;

  beforeEach(() => {
    useCase = new GetMoviesUseCase(mockMovieRepository);
    vi.clearAllMocks();
  });

  it('should return movies when repository call succeeds', async () => {
    (mockMovieRepository.getMovies as any).mockResolvedValue(mockApiResponse);

    const result = await useCase.execute();

    expect(result).toEqual(mockApiResponse);
    expect(mockMovieRepository.getMovies).toHaveBeenCalledWith(undefined);
  });

  it('should pass filters to repository', async () => {
    const filters = { page: 1, size: 10, winner: true };
    (mockMovieRepository.getMovies as any).mockResolvedValue(mockApiResponse);

    await useCase.execute(filters);

    expect(mockMovieRepository.getMovies).toHaveBeenCalledWith(filters);
  });

  it('should throw error when repository call fails', async () => {
    const error = new Error('Repository error');
    (mockMovieRepository.getMovies as any).mockRejectedValue(error);

    await expect(useCase.execute()).rejects.toThrow('Failed to fetch movies');
  });
});
