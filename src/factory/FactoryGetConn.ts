import { DbEnum } from "../configs/enums/db.enum";
import { MySqlConnection } from "../services/DataBase/MySql";
import { PostgresConnection } from "../services/DataBase/Postgres";
import { MongodbConnection } from "../services/DataBase/Mongodb";

export class FactoryGetConn {
  public static getConn(type?: string){
    switch (type) {
      case DbEnum.MYSQL:
        return new MySqlConnection().connect();
      case DbEnum.POSTGRES:
        return new PostgresConnection().connect();
      case DbEnum.MONGODB:
        return new MongodbConnection().connect();
    }
  }
}