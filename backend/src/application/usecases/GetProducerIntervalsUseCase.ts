import { MovieRepository } from '../../domain/interfaces/MovieRepository';
import { ProducerInterval } from '../../domain/entities/ProducerInterval';
import { ProducerIntervalResult } from '../../domain/entities/ProducerIntervalResult';

export class GetProducerIntervalsUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(): Promise<ProducerIntervalResult> {
    const winners = await this.movieRepository.findWinners();
    
    const producerWins = new Map<string, number[]>();
    
    winners.forEach(movie => {
      const producers = movie.getProducersList();
      producers.forEach(producer => {
        if (!producerWins.has(producer)) {
          producerWins.set(producer, []);
        }
        producerWins.get(producer)!.push(movie.year);
      });
    });

    const intervals: ProducerInterval[] = [];
    
    producerWins.forEach((years, producer) => {
      if (years.length >= 2) {
        const sortedYears = years.sort((a, b) => a - b);
        for (let i = 0; i < sortedYears.length - 1; i++) {
          const previousWin = sortedYears[i]!;
          const followingWin = sortedYears[i + 1]!;
          const interval = followingWin - previousWin;
          
          intervals.push(new ProducerInterval(
            producer,
            interval,
            previousWin,
            followingWin
          ));
        }
      }
    });

    if (intervals.length === 0) {
      return new ProducerIntervalResult([], []);
    }

    const minInterval = Math.min(...intervals.map(i => i.interval));
    const maxInterval = Math.max(...intervals.map(i => i.interval));

    const minIntervals = intervals.filter(i => i.interval === minInterval);
    const maxIntervals = intervals.filter(i => i.interval === maxInterval);

    return new ProducerIntervalResult(minIntervals, maxIntervals);
  }
}
