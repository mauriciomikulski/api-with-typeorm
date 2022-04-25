import "reflect-metadata";
import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "gozo1234",
  database: "gestaodb",
  entities: ["src/entity/*.{js,ts}"],
  synchronize: false,
  logging: true,
});

appDataSource.initialize()
  .then(() => {
    console.log("\u{2705} DataBase initialized");
  }
  ).catch((error) => {
    console.log(error);
  }
  );