import express from 'express';
import cors from 'cors';
import compression from 'compression';
import router from './shared/infra/http/routes/index.routes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(compression());
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    this.app.use(cors()); // -> Define allowed host
    this.app.use(router);
  }
}

export default new App().app;
