import * as express from 'express';
import {Express} from 'express';
import * as homeController from './controllers/home';

class App {
  public express: Express;

  constructor() {
    this.express = express();
    this.addRoutes();
  }

  private addRoutes(): void {
    this.express.get('/', homeController.home);
    this.express.get('/foo', homeController.foo);
  }
}

export default new App();
