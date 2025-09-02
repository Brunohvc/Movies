import { Repository } from 'typeorm';
import { MovieRepository } from '../../domain/interfaces/MovieRepository';
import { Movie } from '../../domain/entities/Movie';
import { MovieEntity } from '../database/entities/MovieEntity';

export class TypeOrmMovieRepository implements MovieRepository {
  constructor(private repository: Repository<MovieEntity>) {}

  async save(movie: Movie): Promise<Movie> {
    const entity = this.toEntity(movie);
    const savedEntity = await this.repository.save(entity);
    return this.toDomain(savedEntity);
  }

  async saveAll(movies: Movie[]): Promise<Movie[]> {
    const entities = movies.map(movie => this.toEntity(movie));
    const savedEntities = await this.repository.save(entities);
    return savedEntities.map(entity => this.toDomain(entity));
  }

  async findAll(): Promise<Movie[]> {
    const entities = await this.repository.find();
    return entities.map(entity => this.toDomain(entity));
  }

  async findWinners(): Promise<Movie[]> {
    const entities = await this.repository.find({
      where: { winner: true },
      order: { year: 'ASC' }
    });
    return entities.map(entity => this.toDomain(entity));
  }

  async findByYear(year: number): Promise<Movie[]> {
    const entities = await this.repository.find({
      where: { year }
    });
    return entities.map(entity => this.toDomain(entity));
  }

  async findByProducer(producer: string): Promise<Movie[]> {
    const entities = await this.repository
      .createQueryBuilder('movie')
      .where('movie.producers LIKE :producer', { producer: `%${producer}%` })
      .getMany();
    return entities.map(entity => this.toDomain(entity));
  }

  async clear(): Promise<void> {
    await this.repository.clear();
  }

  private toEntity(movie: Movie): MovieEntity {
    const entity = new MovieEntity();
    entity.year = movie.year;
    entity.title = movie.title;
    entity.studios = movie.studios;
    entity.producers = movie.producers;
    entity.winner = movie.winner;
    if (movie.id) {
      entity.id = movie.id;
    }
    return entity;
  }

  private toDomain(entity: MovieEntity): Movie {
    return new Movie(
      entity.year,
      entity.title,
      entity.studios,
      entity.producers,
      entity.winner,
      entity.id
    );
  }
}
