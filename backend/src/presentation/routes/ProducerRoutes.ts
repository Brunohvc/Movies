import { Router } from 'express';
import { ProducerController } from '../controllers/ProducerController';

export class ProducerRoutes {
  private router: Router;

  constructor(private producerController: ProducerController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get('/intervals', this.producerController.getIntervals.bind(this.producerController));
  }

  getRouter(): Router {
    return this.router;
  }
}
