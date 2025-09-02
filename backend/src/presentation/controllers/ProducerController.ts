import { Request, Response } from 'express';
import { GetProducerIntervalsUseCase } from '../../application/usecases/GetProducerIntervalsUseCase';

export class ProducerController {
  constructor(private getProducerIntervalsUseCase: GetProducerIntervalsUseCase) {}

  async getIntervals(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getProducerIntervalsUseCase.execute();
      
      res.status(200).json({
        min: result.min.map(interval => ({
          producer: interval.producer,
          interval: interval.interval,
          previousWin: interval.previousWin,
          followingWin: interval.followingWin
        })),
        max: result.max.map(interval => ({
          producer: interval.producer,
          interval: interval.interval,
          previousWin: interval.previousWin,
          followingWin: interval.followingWin
        }))
      });
    } catch (error) {
      console.error('Erro ao obter intervalos de produtores:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Não foi possível obter os intervalos dos produtores'
      });
    }
  }
}
