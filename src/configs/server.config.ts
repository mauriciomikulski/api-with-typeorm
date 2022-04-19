import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_PORT = process.env.SERVER_PORT;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
}

const config = {
  server: SERVER
}

export default config;