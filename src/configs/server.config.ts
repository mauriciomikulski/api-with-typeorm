import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_PORT = process.env.SERVER_PORT;

const DB_CONN_STRING = process.env.DB_HOST_MYSQL;
const DB_USER = process.env.DB_USER_MYSQL;
const DB_PASSWORD = process.env.DB_PASSWORD_MYSQL;
const DB_DATABASE = process.env.DB_DATABASE_MYSQL;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
}

const DB = {
  host: DB_CONN_STRING,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
}

const config = {
  server: SERVER,
  db: DB,
}

export default config;