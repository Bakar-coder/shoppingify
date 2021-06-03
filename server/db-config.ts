import { createConnection } from "typeorm";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_TYPE,
  DB_USER,
  __prod__,
} from "./_constants";

export const dbConfig = {
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  type: DB_TYPE,
  username: DB_USER,
  logging: !__prod__,
} as Parameters<typeof createConnection>[0];
