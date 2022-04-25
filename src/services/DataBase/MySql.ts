import "reflect-metadata";
import config from '../../configs/server.config';
import { Any, DataSource } from "typeorm";


export class MySqlConnection {
  conn;
  constructor() {
    this.connect();
    this.initialize();
    this.getRepository(Any);
  }

  connect(): Promise<DataSource> {
    try {
      this.conn = new DataSource({
        type: 'mysql',
        host: config.db.host,
        port: Number(config.db.port),
        username: config.db.user,
        password: config.db.password,
        database: config.db.database,
        entities: ["src/entity/*.{js,ts}"],
        synchronize: false,
        logging: false,
      });
    } catch (error) {
      console.log(error);
    }
    return this.conn;    
  }

  initialize(): DataSource {
    return this.conn.initialize();
  }

  getRepository(entity: any): DataSource {
    return this.conn.getRepository(entity);
  }
}

