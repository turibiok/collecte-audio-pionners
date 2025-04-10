import mysql from "mysql2/promise"; // Pour MySQL/MariaDB
import { Pool } from "pg"; // Pour PostgreSQL
import dotenv from "dotenv";

dotenv.config();

export default class Database {
  private static instance: any = null;

  static async getInstance(type: "mysql" | "postgres"): Promise<any> {
    if (!Database.instance) {
      if (type === "mysql") {
        Database.instance = await mysql.createPool({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });
      } else if (type === "postgres") {
        Database.instance = new Pool({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          port: Number(process.env.DB_PORT),
          max: 10,
        });
      }
    }
    return Database.instance;
  }
}
