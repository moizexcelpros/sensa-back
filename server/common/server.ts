import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import l, { logger } from './logger';
import { config } from '../../environment/environment';
const app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
  optionsSuccessStatus: 200, 
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization, Credentials'
};

export default class ExpressServer {
  private routes: (app: Application) => void;
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.use(express.json({ limit: config.REQUEST_LIMIT || '100kb' }));
    app.use(
      express.urlencoded({
        extended: true,
        limit: config.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(express.text({ limit: config.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser('', {
      maxAge: 60 * 60 * 24 * 14 * 1000,
      httpOnly: true
    }));
    app.use(express.static(`${root}/server/dist`));
    app.use(cors(corsOptions));
    app.set('view engine', 'ejs');
  }

  router(routes: (app: Application) => void): ExpressServer {
    this.routes = routes;
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void =>
      l.info(
        `up and running in ${'production'
        } @: ${os.hostname()} on port: ${p}}`
      );
    this.routes(app);
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}