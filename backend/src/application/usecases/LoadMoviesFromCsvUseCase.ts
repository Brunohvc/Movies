import { MovieRepository } from '../../domain/interfaces/MovieRepository';
import { CsvReader } from '../../domain/interfaces/CsvReader';

export class LoadMoviesFromCsvUseCase {
  constructor(
    private movieRepository: MovieRepository,
    private csvReader: CsvReader
  ) {}

  async execute(filePath: string): Promise<void> {
    await this.movieRepository.clear();
    
    const movies = await this.csvReader.readMovies(filePath);
    
    await this.movieRepository.saveAll(movies);
  }
}
