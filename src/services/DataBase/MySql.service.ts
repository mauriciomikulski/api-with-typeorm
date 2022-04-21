import { IBdConn } from "../../providers/IBdConn.provider";
import config from '../../configs/server.config';
import mysql from "mysql";

const params = {
  user: config.db.user,
  password: config.db.password,
  host: config.db.host,
  database: config.db.database,
}

export class MySqlConnection implements IBdConn {
  connect;
  constructor() {
    this.connect = mysql.createConnection(params);
  }

  async Query<T>(query: string): Promise<any> {
    new Promise<T>((resolve, reject) => {
      this.connect.query(query, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);

      });
    });
  }

}

