import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../shared/types';

export class ErrorHandler {
  static handle(error: ApiError, req: Request, res: Response, next: NextFunction): void {
    console.error('Error:', error);

    const statusCode = error.statusCode || 500;
    const message = error.message || 'Erro interno do servidor';

    res.status(statusCode).json({
      error: message,
      timestamp: new Date().toISOString(),
      path: req.path
    });
  }

  static notFound(req: Request, res: Response): void {
    res.status(404).json({
      error: 'Endpoint não encontrado',
      timestamp: new Date().toISOString(),
      path: req.path
    });
  }
}
