import 'dotenv/config';
import { App } from './App';
import { AppDataSource } from './infrastructure/database/DataSource';

async function main(): Promise<void> {
  try {
    const dataSource = AppDataSource;
    const app = new App(dataSource);
    
    await app.initialize();
    
    const port = process.env.PORT || 3000;
    app.getExpressApp().listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
      console.log(`📊 API disponível em http://localhost:${port}/api/producers/intervals`);
      console.log(`❤️  Health check em http://localhost:${port}/health`);
    });

    process.on('SIGTERM', async () => {
      console.log('Recebido SIGTERM. Encerrando aplicação graciosamente...');
      await app.close();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      console.log('Recebido SIGINT. Encerrando aplicação graciosamente...');
      await app.close();
      process.exit(0);
    });

  } catch (error) {
    console.error('Erro fatal ao iniciar aplicação:', error);
    process.exit(1);
  }
}

main();
