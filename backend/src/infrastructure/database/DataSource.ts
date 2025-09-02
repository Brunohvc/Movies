import { DataSource } from 'typeorm';
import { MovieEntity } from './entities/MovieEntity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.NODE_ENV === 'test' ? ':memory:' : 'database.sqlite',
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
  entities: [MovieEntity],
  migrations: [],
  subscribers: [],
});
