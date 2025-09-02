import { Movie } from '../entities/Movie';

export interface MovieRepository {
  save(movie: Movie): Promise<Movie>;
  saveAll(movies: Movie[]): Promise<Movie[]>;
  findAll(): Promise<Movie[]>;
  findWinners(): Promise<Movie[]>;
  findByYear(year: number): Promise<Movie[]>;
  findByProducer(producer: string): Promise<Movie[]>;
  clear(): Promise<void>;
}
