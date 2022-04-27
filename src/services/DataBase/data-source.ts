import "reflect-metadata";
import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
  type: "mysql",
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [process.env.TYPEORM_ENTITIES],
  synchronize: false,
  logging: false,
});

appDataSource.initialize()
  .then(() => {
    console.log("\u{2705} DataBase initialized");
  }
  ).catch((error) => {
    console.log(error);
  }
  );