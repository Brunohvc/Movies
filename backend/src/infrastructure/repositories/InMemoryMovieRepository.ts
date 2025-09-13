import { MovieRepository } from '../../domain/interfaces/MovieRepository';
import { Movie } from '../../domain/entities/Movie';
import { InMemoryDataSource } from '../database/DataSource';
import { MovieData } from '../../shared/types';

export class InMemoryMovieRepository implements MovieRepository {
  constructor(private dataSource: InMemoryDataSource) {}

  async save(movie: Movie): Promise<Movie> {
    if (movie.id) {
      const movieData: MovieData = {
        year: movie.year,
        title: movie.title,
        studios: movie.studios,
        producers: movie.producers,
        winner: movie.winner
      };
      const updated = await this.dataSource.update(movie.id, movieData);
      
      if (!updated) {
        throw new Error(`Filme com ID ${movie.id} não encontrado para atualização`);
      }
      
      return updated;
    } else {
      const movieData: MovieData = {
        year: movie.year,
        title: movie.title,
        studios: movie.studios,
        producers: movie.producers,
        winner: movie.winner
      };
      return await this.dataSource.create(movieData);
    }
  }

  async saveAll(movies: Movie[]): Promise<Movie[]> {
    const savedMovies: Movie[] = [];
    
    for (const movie of movies) {
      const savedMovie = await this.save(movie);
      savedMovies.push(savedMovie);
    }
    
    return savedMovies;
  }

  async findAll(): Promise<Movie[]> {
    return await this.dataSource.findAll();
  }

  async findWinners(): Promise<Movie[]> {
    return await this.dataSource.findWinners();
  }

  async findByYear(year: number): Promise<Movie[]> {
    return await this.dataSource.findByYear(year);
  }

  async findByProducer(producer: string): Promise<Movie[]> {
    return await this.dataSource.findByProducer(producer);
  }

  async clear(): Promise<void> {
    await this.dataSource.clear();
  }
}
