import { ProducerInterval } from './ProducerInterval';

export class ProducerIntervalResult {
  public readonly min: ProducerInterval[];
  public readonly max: ProducerInterval[];

  constructor(min: ProducerInterval[], max: ProducerInterval[]) {
    this.min = min;
    this.max = max;
  }
}
