import { Movie } from '../../domain/entities/Movie';
import { MovieData, DatabaseTable } from '../../shared/types';

interface Database {
  movies: DatabaseTable<Movie>;
}

export class InMemoryDataSource {
  private database: Database = {
    movies: {
      records: []
    }
  };

  async initialize(): Promise<void> {
    console.log('Banco de dados em memória inicializado');
  }

  async destroy(): Promise<void> {
    this.clear();
    console.log('Banco de dados em memória finalizado');
  }

  get isInitialized(): boolean {
    return true;
  }

  getTable<T>(tableName: keyof Database): DatabaseTable<T> {
    return this.database[tableName] as DatabaseTable<T>;
  }

  async create(movieData: MovieData): Promise<Movie> {
    const moviesTable = this.getTable<Movie>('movies');
    
    const movie = new Movie(
      movieData.year,
      movieData.title,
      movieData.studios,
      movieData.producers,
      movieData.winner,
      moviesTable.records.length + 1
    );
    
    moviesTable.records.push(movie);
    return movie;
  }

  async createMany(moviesData: MovieData[]): Promise<Movie[]> {
    const createdMovies: Movie[] = [];
    
    for (const movieData of moviesData) {
      const movie = await this.create(movieData);
      createdMovies.push(movie);
    }
    
    return createdMovies;
  }

  async findById(id: number): Promise<Movie | null> {
    const moviesTable = this.getTable<Movie>('movies');
    const movie = moviesTable.records.find(m => m.id === id);
    return movie || null;
  }

  async findAll(): Promise<Movie[]> {
    const moviesTable = this.getTable<Movie>('movies');
    return [...moviesTable.records];
  }

  async findBy(criteria: Partial<Movie>): Promise<Movie[]> {
    const moviesTable = this.getTable<Movie>('movies');
    return moviesTable.records.filter(movie => {
      return Object.entries(criteria).every(([key, value]) => {
        const movieValue = movie[key as keyof Movie];
        
        if (key === 'producers' && typeof value === 'string') {
          return movie.producers.toLowerCase().includes(value.toLowerCase());
        }
        
        return movieValue === value;
      });
    });
  }

  async findWinners(): Promise<Movie[]> {
    const moviesTable = this.getTable<Movie>('movies');
    return moviesTable.records
      .filter(movie => movie.winner === true)
      .sort((a, b) => a.year - b.year);
  }

  async findByYear(year: number): Promise<Movie[]> {
    const moviesTable = this.getTable<Movie>('movies');
    return moviesTable.records.filter(movie => movie.year === year);
  }

  async findByProducer(producer: string): Promise<Movie[]> {
    const moviesTable = this.getTable<Movie>('movies');
    return moviesTable.records.filter(movie => 
      movie.producers.toLowerCase().includes(producer.toLowerCase())
    );
  }

  async update(id: number, updateData: Partial<MovieData>): Promise<Movie | null> {
    const moviesTable = this.getTable<Movie>('movies');
    const movieIndex = moviesTable.records.findIndex(m => m.id === id);
    
    if (movieIndex === -1) {
      return null;
    }

    const existingMovie = moviesTable.records[movieIndex]!;
    const updatedMovie = new Movie(
      updateData.year ?? existingMovie.year,
      updateData.title ?? existingMovie.title,
      updateData.studios ?? existingMovie.studios,
      updateData.producers ?? existingMovie.producers,
      updateData.winner ?? existingMovie.winner,
      existingMovie.id
    );

    moviesTable.records[movieIndex] = updatedMovie;
    return updatedMovie;
  }

  async delete(id: number): Promise<boolean> {
    const moviesTable = this.getTable<Movie>('movies');
    const initialLength = moviesTable.records.length;
    moviesTable.records = moviesTable.records.filter(m => m.id !== id);
    return moviesTable.records.length < initialLength;
  }

  async clear(): Promise<void> {
    const moviesTable = this.getTable<Movie>('movies');
    moviesTable.records = [];
  }

  async count(): Promise<number> {
    const moviesTable = this.getTable<Movie>('movies');
    return moviesTable.records.length;
  }

  async countBy(criteria: Partial<Movie>): Promise<number> {
    const matches = await this.findBy(criteria);
    return matches.length;
  }

  async clearTable(tableName: keyof Database): Promise<void> {
    const table = this.getTable(tableName);
    table.records = [];
  }

  async countTable(tableName: keyof Database): Promise<number> {
    const table = this.getTable(tableName);
    return table.records.length;
  }

  getAllTables(): string[] {
    return Object.keys(this.database);
  }
}

export const AppDataSource = new InMemoryDataSource();
