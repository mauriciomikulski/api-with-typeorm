import config from '../../configs/server.config';
import { Response } from 'express';
import { Users } from "../../entity/Users";
import { DataSource } from "typeorm";


export class PostgresConnection{
  conn;
  constructor() {
    this.connect();
  }

  connect(): Promise<DataSource> {
    try {
      this.conn = new DataSource({
        type: "postgres",
        host: config.db.host,
        port: Number(config.db.port),
        username: config.db.user,
        password: config.db.password,
        database: config.db.database,
        entities: [Users],
        synchronize: true,
        logging: false,
      });
    } catch (error) {     
      console.log(error);
    }
    return this.conn;
  }
}

