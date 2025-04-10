
import mysql from 'mysql2/promise';
import { Pool } from 'pg';
import { MongoClient } from 'mongodb';
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private static instances: { [key: string]: any } = {};

  private constructor() {}

  // Factory method to get a connection based on the database type
  public static async getInstance(dbType: 'mysql' | 'postgres' | 'mongodb' | 'prisma' | 'firebase') {
    if (!Database.instances[dbType]) {
      switch (dbType) {
        case 'mysql':
          Database.instances[dbType] = await Database.createMySQLConnection();
          break;
        case 'postgres':
          Database.instances[dbType] = await Database.createPostgresConnection();
          break;
        case 'mongodb':
          Database.instances[dbType] = await Database.createMongoDBConnection();
          break;
        case 'firebase':
          Database.instances[dbType] = Database.createFirebaseConnection();
          break;
        default:
          throw new Error('Type de base de données non supporté');
      }
    }
    return Database.instances[dbType];
  }

  // MySQL Connection
  private static async createMySQLConnection() {
    return mysql.createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  // PostgreSQL Connection
  private static async createPostgresConnection() {
    return new Pool({
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      port: Number(process.env.PG_PORT) || 5432,
    });
  }

  // MongoDB Connection
  private static async createMongoDBConnection() {
    const client = new MongoClient(process.env.MONGO_URI as string);
    await client.connect();
    return client.db(process.env.MONGO_DB_NAME);
  }

  // Firebase Connection
  private static createFirebaseConnection() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS as string))
      });
    }
    return admin.firestore();
  }
}

export default Database;