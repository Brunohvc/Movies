import request from 'supertest';
import { DataSource } from 'typeorm';
import express from 'express';
import { AppDataSource } from '../../src/infrastructure/database/DataSource';
import { TypeOrmMovieRepository } from '../../src/infrastructure/repositories/TypeOrmMovieRepository';
import { MovieEntity } from '../../src/infrastructure/database/entities/MovieEntity';
import { Movie } from '../../src/domain/entities/Movie';
import { GetProducerIntervalsUseCase } from '../../src/application/usecases/GetProducerIntervalsUseCase';
import { ProducerController } from '../../src/presentation/controllers/ProducerController';
import { ProducerRoutes } from '../../src/presentation/routes/ProducerRoutes';
import { ErrorHandler } from '../../src/presentation/middlewares/ErrorHandler';

describe('Producer Intervals Integration Tests', () => {
  let app: express.Application;
  let dataSource: DataSource;
  let repository: TypeOrmMovieRepository;

  beforeAll(async () => {
    dataSource = AppDataSource;
    await dataSource.initialize();
    repository = new TypeOrmMovieRepository(dataSource.getRepository(MovieEntity));
    
    app = express();
    app.use(express.json());
    const getProducerIntervalsUseCase = new GetProducerIntervalsUseCase(repository);
    const producerController = new ProducerController(getProducerIntervalsUseCase);
    const producerRoutes = new ProducerRoutes(producerController);

    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
    });

    app.use('/api/producers', producerRoutes.getRouter());
    
    app.use((req: any, res: any, next: any) => {
      res.status(404).json({
        error: 'Endpoint não encontrado',
        timestamp: new Date().toISOString(),
        path: req.path
      });
    });
    
    app.use(ErrorHandler.handle);
  });

  afterAll(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });

  beforeEach(async () => {
    await repository.clear();
  });

  describe('GET /api/producers/intervals', () => {
    it('should return empty arrays when no winners exist', async () => {
      const response = await request(app)
        .get('/api/producers/intervals')
        .expect(200);

      expect(response.body).toEqual({
        min: [],
        max: []
      });
    });

    it('should return correct intervals based on CSV data structure', async () => {

      const testMovies = [
        new Movie(1980, "Can't Stop the Music", "Associated Film Distribution", "Allan Carr", true),
        new Movie(1981, "Mommie Dearest", "Paramount Pictures", "Frank Yablans", true),
        new Movie(1982, "Inchon", "MGM", "Mitsuharu Ishii", true),
        new Movie(1983, "The Lonely Lady", "Universal Studios", "Robert R. Weston", true),
        new Movie(1984, "Bolero", "Cannon Films", "Bo Derek", true),
        new Movie(1985, "Rambo: First Blood Part II", "Columbia Pictures", "Buzz Feitshans", true),
        new Movie(1986, "Howard the Duck", "Universal Studios", "Gloria Katz", true),
        new Movie(1986, "Under the Cherry Moon", "Warner Bros.", "Bob Cavallo, Joe Ruffalo and Steve Fargnoli", true),
        new Movie(1987, "Leonard Part 6", "Columbia Pictures", "Bill Cosby", true),
        new Movie(1990, "The Adventures of Ford Fairlane", "20th Century Fox", "Steven Perry and Joel Silver", true),
        new Movie(1990, "Ghosts Can't Do It", "Triumph Releasing", "Bo Derek", true),
        new Movie(1999, "Wild Wild West", "Warner Bros.", "Jon Peters and Barry Sonnenfeld", true),
        new Movie(2002, "Swept Away", "Screen Gems", "Matthew Vaughn", true),
        new Movie(2008, "The Love Guru", "Paramount Pictures", "Gary Barber, Michael DeLuca and Mike Myers", true),
      ];

      await repository.saveAll(testMovies);

      const response = await request(app)
        .get('/api/producers/intervals')
        .expect(200);

      expect(response.body).toHaveProperty('min');
      expect(response.body).toHaveProperty('max');
      expect(Array.isArray(response.body.min)).toBe(true);
      expect(Array.isArray(response.body.max)).toBe(true);
      const allIntervals = [...response.body.min, ...response.body.max];
      const boDerekInterval = allIntervals.find((interval: any) => interval.producer === 'Bo Derek');
      expect(boDerekInterval).toBeDefined();
      expect(boDerekInterval.interval).toBe(6);
      expect(boDerekInterval.previousWin).toBe(1984);
      expect(boDerekInterval.followingWin).toBe(1990);
    });

    it('should handle producers with multiple wins correctly', async () => {
      const testMovies = [
        new Movie(2000, "Movie 1", "Studio 1", "Producer A", true),
        new Movie(2001, "Movie 2", "Studio 2", "Producer A", true),
        new Movie(2005, "Movie 3", "Studio 3", "Producer A", true),
        new Movie(2010, "Movie 4", "Studio 4", "Producer B", true),
        new Movie(2020, "Movie 5", "Studio 5", "Producer B", true),
      ];

      await repository.saveAll(testMovies);

      const response = await request(app)
        .get('/api/producers/intervals')
        .expect(200);

      expect(response.body.min).toBeDefined();
      expect(response.body.max).toBeDefined();

      expect(response.body.min.length).toBeGreaterThan(0);
      expect(response.body.max.length).toBeGreaterThan(0);
      
      const minInterval = response.body.min[0];
      expect(minInterval.interval).toBe(1);
      expect(minInterval.producer).toBe('Producer A');
      expect(minInterval.previousWin).toBe(2000);
      expect(minInterval.followingWin).toBe(2001);

      const maxInterval = response.body.max[0];
      expect(maxInterval.interval).toBe(10);
      expect(maxInterval.producer).toBe('Producer B');
      expect(maxInterval.previousWin).toBe(2010);
      expect(maxInterval.followingWin).toBe(2020);
    });

    it('should parse multiple producers from same movie correctly', async () => {
      const testMovies = [
        new Movie(2000, "Movie 1", "Studio 1", "Producer A, Producer B and Producer C", true),
        new Movie(2002, "Movie 2", "Studio 2", "Producer A", true),
        new Movie(2004, "Movie 3", "Studio 3", "Producer B", true),
      ];

      await repository.saveAll(testMovies);

      const response = await request(app)
        .get('/api/producers/intervals')
        .expect(200);

      const allIntervals = [...response.body.min, ...response.body.max];
      
      const producerAInterval = allIntervals.find((interval: any) => interval.producer === 'Producer A');
      expect(producerAInterval).toBeDefined();
      expect(producerAInterval.interval).toBe(2);

      const producerBInterval = allIntervals.find((interval: any) => interval.producer === 'Producer B');
      expect(producerBInterval).toBeDefined();
      expect(producerBInterval.interval).toBe(4);
    });

    it('should not include non-winner movies', async () => {
      const testMovies = [
        new Movie(2000, "Winner Movie 1", "Studio 1", "Producer A", true),
        new Movie(2001, "Loser Movie", "Studio 2", "Producer A", false),
        new Movie(2002, "Winner Movie 2", "Studio 3", "Producer A", true),
      ];

      await repository.saveAll(testMovies);

      const response = await request(app)
        .get('/api/producers/intervals')
        .expect(200);

      const allIntervals = [...response.body.min, ...response.body.max];
      const producerAInterval = allIntervals.find((interval: any) => interval.producer === 'Producer A');
      
      expect(producerAInterval.interval).toBe(2);
      expect(producerAInterval.previousWin).toBe(2000);
      expect(producerAInterval.followingWin).toBe(2002);
    });

    it('should handle error gracefully when database fails', async () => {
      const mockRepository = {
        ...repository,
        findWinners: jest.fn().mockRejectedValue(new Error('Database connection failed'))
      };

      const mockUseCase = new GetProducerIntervalsUseCase(mockRepository as any);
      const mockController = new ProducerController(mockUseCase);
      const mockRoutes = new ProducerRoutes(mockController);

      const testApp = express();
      testApp.use(express.json());
      testApp.use('/api/producers', mockRoutes.getRouter());
      testApp.use(ErrorHandler.handle);

      const response = await request(testApp)
        .get('/api/producers/intervals')
        .expect(500);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Erro interno do servidor');
    });
  });

  describe('GET /health', () => {
    it('should return health check', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /non-existent-endpoint', () => {
    it('should return 404 for non-existent endpoints', async () => {
      const response = await request(app)
        .get('/non-existent-endpoint')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Endpoint não encontrado');
      expect(response.body).toHaveProperty('path', '/non-existent-endpoint');
    });
  });
});
