import pino from 'pino';
import { config } from '../../environment/environment';
var winston = require('winston');
require('winston-daily-rotate-file');

const l = pino({
  name: config.APP_ID,
  level: config.LOG_LEVEL,
});

export default l;

var transport = new winston.transports.DailyRotateFile({
  filename: './logs/sensa-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '10m',
  maxFiles: '2d'
});

export const logger = winston.createLogger({
  transports: [
    transport
  ]
});