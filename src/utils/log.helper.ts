import * as winston from 'winston';
import * as expressWinstons from 'express-winston';

export const log = (namespace: string, message: string, type: any, object = {}) => {
  object && console.log(`[${getTimeStamp()}] [${namespace}] [${type}] ${message}`, object);
};

const getTimeStamp = () => {
  return new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
};

export const loggerOptions: expressWinstons.LoggerOptions = {
  transports: [ new winston.transports.Console() ],
  format: winston.format.combine(    
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true }),
  ),
  meta: false,
}
