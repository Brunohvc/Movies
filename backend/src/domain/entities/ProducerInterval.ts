export class ProducerInterval {
  public readonly producer: string;
  public readonly interval: number;
  public readonly previousWin: number;
  public readonly followingWin: number;

  constructor(
    producer: string,
    interval: number,
    previousWin: number,
    followingWin: number
  ) {
    this.producer = producer;
    this.interval = interval;
    this.previousWin = previousWin;
    this.followingWin = followingWin;
  }
}
