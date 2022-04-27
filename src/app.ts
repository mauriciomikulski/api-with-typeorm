import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressWinstons from 'express-winston';
import  {log,loggerOptions}  from './utils/LogHelper';
import { CommonRoutes } from './routes/CommonRoutes';
import { UsersRoutes } from './routes/UsersRoutes';
import { LOG_CONSTANTS } from './configs/constants/LogConstants';
import "./services/DataBase/data-source";

class App {
  server: Application;
  protected NAMESPACE: string;
  protected routes: Array<CommonRoutes> = [];

  constructor() {
    
    this.NAMESPACE = 'App';
    this.server = express();

    this.addLoggers();
    this.rulesOfApi();
    this.middlewares();
    this.getRoutes();
  }

  protected middlewares() {
    this.server.use(express.json());
    this.server.use(expressWinstons.logger(loggerOptions));
    this.server.use(cors());
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
  }

  protected rulesOfApi() {
    this.server.use((req, res, next) => {

      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
      }

      next();

    })
  }

  protected addLoggers() {
    this.server.use((req, res, next) => {
      log(
        this.NAMESPACE,
        `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.ip}]`,
        LOG_CONSTANTS.LOG_LEVEL.INFO
      );

      res.on('finish', () => {
        log(
          this.NAMESPACE,
          `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.ip}] - STATUS: [${res.statusCode}]`,
          LOG_CONSTANTS.LOG_LEVEL.INFO
        );
      });
      next();
    })

  }

  protected getRoutes() {
    this.server.get('/', (req, res) => {
      const error = new Error('You dont have permission to access this page');
      res.status(401).send(error.message);
    })
    
    this.routes.push(new UsersRoutes(this.server));

  };

}

export default App;