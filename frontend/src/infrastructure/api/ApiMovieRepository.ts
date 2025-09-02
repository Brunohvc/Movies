import { MovieRepository } from '../../domain/interfaces/MovieRepository';
import { HttpClient } from '../http/HttpClient';
import { API_ENDPOINTS } from '../../shared/constants';
import {
  Movie,
  ApiResponse,
  MovieFilters,
  YearsWithMultipleWinnersResponse,
  StudiosWithWinCountResponse,
  ProducerIntervalsResponse,
  WinnerByYear,
} from '../../shared/types';

export class ApiMovieRepository implements MovieRepository {
  constructor(private httpClient: HttpClient) {}

  async getMovies(filters?: MovieFilters): Promise<ApiResponse<Movie>> {
    const params: Record<string, any> = {
      page: filters?.page ?? 0,
      size: filters?.size ?? 20,
    };
    
    if (filters?.winner !== undefined) params.winner = filters.winner;
    if (filters?.year !== undefined) params.year = filters.year;

    return this.httpClient.get<ApiResponse<Movie>>(API_ENDPOINTS.MOVIES, params);
  }

  async getYearsWithMultipleWinners(): Promise<YearsWithMultipleWinnersResponse> {
    return this.httpClient.get<YearsWithMultipleWinnersResponse>(
      API_ENDPOINTS.YEARS_WITH_MULTIPLE_WINNERS
    );
  }

  async getStudiosWithWinCount(): Promise<StudiosWithWinCountResponse> {
    return this.httpClient.get<StudiosWithWinCountResponse>(
      API_ENDPOINTS.STUDIOS_WITH_WIN_COUNT
    );
  }

  async getProducerIntervals(): Promise<ProducerIntervalsResponse> {
    return this.httpClient.get<ProducerIntervalsResponse>(
      API_ENDPOINTS.PRODUCER_INTERVALS
    );
  }

  async getWinnersByYear(year: number): Promise<WinnerByYear[]> {
    const response = await this.httpClient.get<WinnerByYear[]>(
      API_ENDPOINTS.WINNERS_BY_YEAR,
      { year }
    );
    
    // A API retorna um objeto ou array dependendo do resultado
    return Array.isArray(response) ? response : [response];
  }
}
