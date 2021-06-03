import { createLogger, format, transports } from 'winston';
// import * as redisTransport from 'winston-redis';
import { __prod__ } from '../_constants';
const { combine, timestamp, label, prettyPrint, colorize } = format;

export const logger = createLogger({
  format: combine(
    label({ label: 'logs' }),
    timestamp(),
    prettyPrint(),
    colorize()
  ),
  transports: __prod__
    ? [
        new transports.File({ filename: 'errors.log', level: 'error' }),
        new transports.File({ filename: 'info.log' }),
        // new redisTransport()
      ]
    : [
        new transports.File({ filename: 'errors.log', level: 'error' }),
        new transports.Console({ format: format.simple() }),
      ],
});
