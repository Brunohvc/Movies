import { Movie } from '../entities/Movie';

export interface CsvReader {
  readMovies(filePath: string): Promise<Movie[]>;
}
