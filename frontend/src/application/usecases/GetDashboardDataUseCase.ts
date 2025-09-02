import { MovieRepository } from '../../domain/interfaces/MovieRepository';
import {
  YearsWithMultipleWinnersResponse,
  StudiosWithWinCountResponse,
  ProducerIntervalsResponse,
  WinnerByYear,
} from '../../shared/types';

export class GetDashboardDataUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async getYearsWithMultipleWinners(): Promise<YearsWithMultipleWinnersResponse> {
    try {
      return await this.movieRepository.getYearsWithMultipleWinners();
    } catch (error) {
      console.error('Error fetching years with multiple winners:', error);
      throw new Error('Failed to fetch years with multiple winners');
    }
  }

  async getStudiosWithWinCount(): Promise<StudiosWithWinCountResponse> {
    try {
      return await this.movieRepository.getStudiosWithWinCount();
    } catch (error) {
      console.error('Error fetching studios with win count:', error);
      throw new Error('Failed to fetch studios with win count');
    }
  }

  async getProducerIntervals(): Promise<ProducerIntervalsResponse> {
    try {
      return await this.movieRepository.getProducerIntervals();
    } catch (error) {
      console.error('Error fetching producer intervals:', error);
      throw new Error('Failed to fetch producer intervals');
    }
  }

  async getWinnersByYear(year: number): Promise<WinnerByYear[]> {
    try {
      return await this.movieRepository.getWinnersByYear(year);
    } catch (error) {
      console.error('Error fetching winners by year:', error);
      throw new Error('Failed to fetch winners by year');
    }
  }
}
