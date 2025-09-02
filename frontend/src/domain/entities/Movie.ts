export class MovieEntity {
  constructor(
    public readonly id: number,
    public readonly year: number,
    public readonly title: string,
    public readonly studios: string[],
    public readonly producers: string[],
    public readonly winner: boolean
  ) {}

  get studiosText(): string {
    return this.studios.join(', ');
  }

  get producersText(): string {
    return this.producers.join(', ');
  }

  get isWinner(): boolean {
    return this.winner;
  }
}
