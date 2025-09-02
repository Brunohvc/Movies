import {
  Movie,
  ApiResponse,
  MovieFilters,
  YearsWithMultipleWinnersResponse,
  StudiosWithWinCountResponse,
  ProducerIntervalsResponse,
  WinnerByYear,
} from '../../shared/types';

export interface MovieRepository {
  getMovies(filters?: MovieFilters): Promise<ApiResponse<Movie>>;
  getYearsWithMultipleWinners(): Promise<YearsWithMultipleWinnersResponse>;
  getStudiosWithWinCount(): Promise<StudiosWithWinCountResponse>;
  getProducerIntervals(): Promise<ProducerIntervalsResponse>;
  getWinnersByYear(year: number): Promise<WinnerByYear[]>;
}
