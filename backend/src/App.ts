import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { InMemoryDataSource } from './infrastructure/database/DataSource';
import { InMemoryMovieRepository } from './infrastructure/repositories/InMemoryMovieRepository';
import { CsvReaderService } from './infrastructure/services/CsvReaderService';
import { GetProducerIntervalsUseCase } from './application/usecases/GetProducerIntervalsUseCase';
import { LoadMoviesFromCsvUseCase } from './application/usecases/LoadMoviesFromCsvUseCase';
import { ProducerController } from './presentation/controllers/ProducerController';
import { ProducerRoutes } from './presentation/routes/ProducerRoutes';
import { ErrorHandler } from './presentation/middlewares/ErrorHandler';
import * as path from 'path';

export class App {
  private app: express.Application;
  private dataSource: InMemoryDataSource;

  constructor(dataSource: InMemoryDataSource) {
    this.app = express();
    this.dataSource = dataSource;
    this.setupMiddlewares();
  }

  private setupMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes(): void {
    this.app.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
    });

    const movieRepository = new InMemoryMovieRepository(this.dataSource);
    const getProducerIntervalsUseCase = new GetProducerIntervalsUseCase(movieRepository);
    const producerController = new ProducerController(getProducerIntervalsUseCase);
    const producerRoutes = new ProducerRoutes(producerController);

    this.app.use('/api/producers', producerRoutes.getRouter());
    this.app.use((req, res, next) => {
      res.status(404).json({
        error: 'Endpoint não encontrado',
        timestamp: new Date().toISOString(),
        path: req.path
      });
    });
    this.app.use(ErrorHandler.handle);
  }

  async initialize(): Promise<void> {
    try {
      await this.dataSource.initialize();
      console.log('Conexão com banco de dados estabelecida');

      await this.loadInitialData();

      this.setupRoutes();

      console.log('Aplicação inicializada com sucesso');
    } catch (error) {
      console.error('Erro ao inicializar aplicação:', error);
      throw error;
    }
  }

  private async loadInitialData(): Promise<void> {
    try {
      const movieRepository = new InMemoryMovieRepository(this.dataSource);
      const csvReader = new CsvReaderService();
      const loadMoviesUseCase = new LoadMoviesFromCsvUseCase(movieRepository, csvReader);

      const csvPath = path.join(__dirname, '..', 'data', 'movielist.csv');
      await loadMoviesUseCase.execute(csvPath);
      
      console.log('Dados iniciais carregados do CSV');
    } catch (error) {
      console.error('Erro ao carregar dados iniciais:', error);
      throw error;
    }
  }

  getExpressApp(): express.Application {
    return this.app;
  }

  async close(): Promise<void> {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
    }
  }
}
