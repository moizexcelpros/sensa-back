import { Application } from 'express';
import path from 'path';

import api from './api';
const staticPath = path.join(__dirname, "./dist");


export default function routes(app: Application): void {
  app.use('/api', api);
}
