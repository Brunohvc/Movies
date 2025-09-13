import request from 'supertest';
import express from 'express';
import { AppDataSource, InMemoryDataSource } from '../../src/infrastructure/database/DataSource';
import { InMemoryMovieRepository } from '../../src/infrastructure/repositories/InMemoryMovieRepository';
import { CsvReaderService } from '../../src/infrastructure/services/CsvReaderService';
import { LoadMoviesFromCsvUseCase } from '../../src/application/usecases/LoadMoviesFromCsvUseCase';
import { GetProducerIntervalsUseCase } from '../../src/application/usecases/GetProducerIntervalsUseCase';
import { ProducerController } from '../../src/presentation/controllers/ProducerController';
import { ProducerRoutes } from '../../src/presentation/routes/ProducerRoutes';
import { ErrorHandler } from '../../src/presentation/middlewares/ErrorHandler';
import * as path from 'path';
import * as fs from 'fs';

describe('CSV Data Integrity Tests', () => {
  let app: express.Application;
  let dataSource: InMemoryDataSource;
  let repository: InMemoryMovieRepository;
  let csvPath: string;

  beforeAll(async () => {
    dataSource = AppDataSource;
    await dataSource.initialize();
    repository = new InMemoryMovieRepository(dataSource);
    csvPath = path.join(__dirname, '..', '..', 'data', 'movielist.csv');
    
    const csvReader = new CsvReaderService();
    const loadMoviesUseCase = new LoadMoviesFromCsvUseCase(repository, csvReader);
    await loadMoviesUseCase.execute(csvPath);
    
    app = express();
    app.use(express.json());
    const getProducerIntervalsUseCase = new GetProducerIntervalsUseCase(repository);
    const producerController = new ProducerController(getProducerIntervalsUseCase);
    const producerRoutes = new ProducerRoutes(producerController);

    app.use('/api/producers', producerRoutes.getRouter());
    app.use(ErrorHandler.handle);
  });

  afterAll(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });

  describe('CSV File Validation', () => {
    it('should load exactly the expected number of movies from CSV', async () => {
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      const lines = csvContent.split('\n').filter(line => line.trim() !== '');
      const expectedMovieCount = lines.length - 1; // Subtraindo o header
      
      const allMovies = await repository.findAll();
      expect(allMovies.length).toBe(expectedMovieCount);
    });

    it('should load exactly the expected number of winners from CSV', async () => {
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      const lines = csvContent.split('\n');
      const expectedWinnerCount = lines.filter(line => line.includes(';yes')).length;
      
      const winners = await repository.findWinners();
      expect(winners.length).toBe(expectedWinnerCount);
    });

    it('should contain specific known winners from CSV', async () => {
      const winners = await repository.findWinners();
      const winnerTitles = winners.map(movie => movie.title);
      
      expect(winnerTitles).toContain("Can't Stop the Music");
      expect(winnerTitles).toContain("Mommie Dearest");
      expect(winnerTitles).toContain("Inchon");
      expect(winnerTitles).toContain("The Lonely Lady");
      expect(winnerTitles).toContain("Bolero");
      expect(winnerTitles).toContain("Cats");
    });

    it('should contain specific known years with correct data', async () => {
      const year1980Movies = await repository.findByYear(1980);
      const year2019Movies = await repository.findByYear(2019);
      
      expect(year1980Movies.length).toBe(10);
      expect(year2019Movies.length).toBe(5);
      
      const year1980Winner = year1980Movies.find(movie => movie.winner);
      expect(year1980Winner?.title).toBe("Can't Stop the Music");
      expect(year1980Winner?.producers).toBe("Allan Carr");
    });

    it('should contain correct producer data for known cases', async () => {
      const boDerekMovies = await repository.findByProducer("Bo Derek");
      expect(boDerekMovies.length).toBe(2);
      
      const titles = boDerekMovies.map(movie => movie.title);
      expect(titles).toContain("Bolero");
      expect(titles).toContain("Ghosts Can't Do It");
      
      const bolero = boDerekMovies.find(movie => movie.title === "Bolero");
      expect(bolero?.year).toBe(1984);
      expect(bolero?.winner).toBe(true);
    });

    it('should maintain CSV data consistency in API response', async () => {
      const response = await request(app)
        .get('/api/producers/intervals')
        .expect(200);

      expect(response.body).toHaveProperty('min');
      expect(response.body).toHaveProperty('max');
      expect(Array.isArray(response.body.min)).toBe(true);
      expect(Array.isArray(response.body.max)).toBe(true);
      
      const minInterval = response.body.min[0];
      expect(minInterval.producer).toBe('Joel Silver');
      expect(minInterval.interval).toBe(1);
      expect(minInterval.previousWin).toBe(1990);
      expect(minInterval.followingWin).toBe(1991);
      
      const maxInterval = response.body.max[0];
      expect(maxInterval.producer).toBe('Matthew Vaughn');
      expect(maxInterval.interval).toBe(13);
      expect(maxInterval.previousWin).toBe(2002);
      expect(maxInterval.followingWin).toBe(2015);
    });

    it('should verify producers with multiple wins data integrity', async () => {
      const winners = await repository.findWinners();
      const producersWithMultipleWins = new Map<string, number[]>();
      
      winners.forEach(movie => {
        const producers = movie.getProducersList();
        producers.forEach(producer => {
          if (!producersWithMultipleWins.has(producer)) {
            producersWithMultipleWins.set(producer, []);
          }
          producersWithMultipleWins.get(producer)!.push(movie.year);
        });
      });
      
      const multipleWinners = Array.from(producersWithMultipleWins.entries())
        .filter(([_, years]) => years.length >= 2);
      
      expect(multipleWinners.length).toBeGreaterThan(0);
      
      const joelSilverWins = producersWithMultipleWins.get('Joel Silver');
      expect(joelSilverWins).toContain(1990);
      expect(joelSilverWins).toContain(1991);
      
      const matthewVaughnWins = producersWithMultipleWins.get('Matthew Vaughn');
      expect(matthewVaughnWins).toContain(2002);
      expect(matthewVaughnWins).toContain(2015);
    });

    it('should verify complete CSV content integrity', async () => {
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      const lines = csvContent.split('\n').filter(line => line.trim() !== '');
      const csvMovies = lines.slice(1).map(line => {
        const parts = line.split(';');
        return {
          year: parseInt(parts[0]!),
          title: parts[1]!,
          studios: parts[2]!,
          producers: parts[3]!,
          winner: parts[4] === 'yes'
        };
      });

      const allMovies = await repository.findAll();
      
      expect(allMovies.length).toBe(csvMovies.length);
      
      for (const csvMovie of csvMovies) {
        const dbMovie = allMovies.find(movie => 
          movie.year === csvMovie.year && 
          movie.title === csvMovie.title
        );
        
        expect(dbMovie).toBeDefined();
        expect(dbMovie?.studios).toBe(csvMovie.studios);
        expect(dbMovie?.producers).toBe(csvMovie.producers);
        expect(dbMovie?.winner).toBe(csvMovie.winner);
      }
    });

    it('should verify CSV data order and integrity', async () => {
      const allMovies = await repository.findAll();
      const sortedMovies = allMovies.sort((a, b) => a.id! - b.id!);
      
      const firstMovie = sortedMovies[0];
      expect(firstMovie?.year).toBe(1980);
      expect(firstMovie?.title).toBe("Can't Stop the Music");
      expect(firstMovie?.producers).toBe("Allan Carr");
      expect(firstMovie?.winner).toBe(true);

      const secondMovie = sortedMovies[1];
      expect(secondMovie?.year).toBe(1980);
      expect(secondMovie?.title).toBe("Cruising");
      expect(secondMovie?.producers).toBe("Jerry Weintraub");
      expect(secondMovie?.winner).toBe(false);
    });

    it('should fail if CSV data changes affect API results', async () => {
      const response = await request(app)
        .get('/api/producers/intervals')
        .expect(200);

      const minIntervals = response.body.min;
      const maxIntervals = response.body.max;
      
      expect(minIntervals.length).toBe(1);
      expect(maxIntervals.length).toBe(1);
      
      expect(minIntervals[0].producer).toBe('Joel Silver');
      expect(minIntervals[0].interval).toBe(1);
      expect(minIntervals[0].previousWin).toBe(1990);
      expect(minIntervals[0].followingWin).toBe(1991);
      
      expect(maxIntervals[0].producer).toBe('Matthew Vaughn');
      expect(maxIntervals[0].interval).toBe(13);
      expect(maxIntervals[0].previousWin).toBe(2002);
      expect(maxIntervals[0].followingWin).toBe(2015);
    });
  });

  describe('CSV File Content Validation', () => {
    it('should have valid CSV structure', () => {
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      const lines = csvContent.split('\n').filter(line => line.trim() !== '');
      
      expect(lines[0]).toBe('year;title;studios;producers;winner');
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i]!;
        const parts = line.split(';');
        expect(parts.length).toBe(5);
        expect(parseInt(parts[0]!)).toBeGreaterThan(1979);
        expect(parseInt(parts[0]!)).toBeLessThan(2025);
        expect(parts[1]!.trim()).not.toBe('');
        expect(parts[2]!.trim()).not.toBe('');
        expect(parts[3]!.trim()).not.toBe('');
        expect(['yes', '']).toContain(parts[4]);
      }
    });

    it('should maintain expected total counts from CSV', async () => {
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      const lines = csvContent.split('\n').filter(line => line.trim() !== '');
      
      expect(lines.length - 1).toBe(206); // Total de filmes esperado
      
      const winnersInCsv = lines.filter(line => line.endsWith(';yes')).length;
      expect(winnersInCsv).toBe(42); // Total de vencedores esperado
      
      const dbWinners = await repository.findWinners();
      expect(dbWinners.length).toBe(winnersInCsv);
    });
  });
});
