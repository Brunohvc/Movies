import { HttpClient } from '../../infrastructure/http/HttpClient';
import { ApiMovieRepository } from '../../infrastructure/api/ApiMovieRepository';
import { GetMoviesUseCase } from '../usecases/GetMoviesUseCase';
import { GetDashboardDataUseCase } from '../usecases/GetDashboardDataUseCase';

export class MovieService {
  private httpClient: HttpClient;
  private movieRepository: ApiMovieRepository;
  private getMoviesUseCase: GetMoviesUseCase;
  private getDashboardDataUseCase: GetDashboardDataUseCase;

  constructor() {
    this.httpClient = new HttpClient();
    this.movieRepository = new ApiMovieRepository(this.httpClient);
    this.getMoviesUseCase = new GetMoviesUseCase(this.movieRepository);
    this.getDashboardDataUseCase = new GetDashboardDataUseCase(this.movieRepository);
  }

  get movies() {
    return this.getMoviesUseCase;
  }

  get dashboard() {
    return this.getDashboardDataUseCase;
  }
}
