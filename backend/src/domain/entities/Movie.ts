export class Movie {
  public readonly id?: number;
  public readonly year: number;
  public readonly title: string;
  public readonly studios: string;
  public readonly producers: string;
  public readonly winner: boolean;

  constructor(
    year: number,
    title: string,
    studios: string,
    producers: string,
    winner: boolean,
    id?: number
  ) {
    this.id = id;
    this.year = year;
    this.title = title;
    this.studios = studios;
    this.producers = producers;
    this.winner = winner;
  }

  public getProducersList(): string[] {
    return this.producers
      .split(/,| and /)
      .map(producer => producer.trim())
      .filter(producer => producer.length > 0);
  }
}
