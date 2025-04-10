// Database.test.ts

import Database from '../Database';

import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });




describe('Database (Real Connection)', () => {
 

  it('devrait retourner une instance réelle de MySQL', async () => {
      const mysqlInstance = await Database.getInstance('mysql');
      expect(mysqlInstance.getConnection).toBeDefined();
      const conn = await mysqlInstance.getConnection();
      await conn.ping(); // Vérifie la connexion MySQL
      conn.release();
  });

  it('devrait retourner une instance réelle de PostgreSQL', async () => {
      const pgInstance = await Database.getInstance('postgres');
      expect(pgInstance.connect).toBeDefined();
      const client = await pgInstance.connect();
      await client.query('SELECT 1'); // Vérifie la connexion PostgreSQL
      client.release();
  });

  // it('devrait retourner une instance réelle de MongoDB', async () => {
  //     const mongoInstance = await Database.getInstance('mongodb');
  //     expect(mongoInstance.collection).toBeDefined();
  //     const collection = mongoInstance.collection('test');
  //     await collection.insertOne({ test: 'value' });
  //     const doc = await collection.findOne({ test: 'value' });
  //     expect(doc).toBeDefined();
  // });

  // it('devrait retourner une instance réelle de Firebase Firestore', async () => {
  //     const firebaseInstance = await Database.getInstance('firebase');
  //     expect(firebaseInstance.collection).toBeDefined();
  //     const docRef = firebaseInstance.collection('test').doc('sample');
  //     await docRef.set({ test: 'value' });
  //     const doc = await docRef.get();
  //     expect(doc.exists).toBe(true);
  // });

  
  
  // it('devrait retourner une instance réelle de Firebase Firestore', async () => {
  //   jest.setTimeout(10000); // Définit un timeout de 10 secondes (10000 ms)
  
  //   const firebaseInstance = await Database.getInstance('firebase');
  //   expect(firebaseInstance.collection).toBeDefined();
    
  //   const docRef = firebaseInstance.collection('test').doc('sample');
  //   await docRef.set({ test: 'value' });
    
  //   const doc = await docRef.get();
  //   expect(doc.exists).toBe(true);
    
  //   const data = doc.data();
  //   expect(data?.test).toBe('value');
    
  //   await docRef.delete();
  // });
  
  

});






// import mysql from 'mysql2/promise';
// import { Pool } from 'pg';
// import { MongoClient } from 'mongodb';
// import admin from 'firebase-admin';
// import Database from '../Database';




// // Simuler la création de pool MySQL
// jest.mock('mysql2/promise', () => ({
//   createPool: jest.fn(() => Promise.resolve({ mysqlPool: true })),
// }));

// // Simuler Pool de PostgreSQL
// jest.mock('pg', () => {
//   return {
//     Pool: jest.fn(() => ({ pgPool: true })),
//   };
// });

// // Simuler MongoClient
// const mockConnect = jest.fn(() => Promise.resolve());
// const mockDb = jest.fn(() => ({ mongoDb: true }));
// jest.mock('mongodb', () => ({
//   MongoClient: jest.fn().mockImplementation(() => ({
//     connect: mockConnect,
//     db: mockDb,
//   })),
// }));



// // Simuler Firebase admin
// const mockFirestore = jest.fn(() => ({ firebaseFirestore: true }));
// const mockInitializeApp = jest.fn();
// const mockCredential = { cert: jest.fn() };
// jest.mock('firebase-admin', () => ({
//   apps: [],
//   initializeApp: jest.fn(() => {
//     mockInitializeApp();
//   }),
//   credential: {
//     cert: jest.fn(() => ({})),
//   },
//   firestore: mockFirestore,
// }));




// describe('Database', () => {
//   beforeAll(() => {
//     // Définir quelques variables d'environnement factices pour les tests
//     process.env.DB_HOST = 'localhost';
//     process.env.DB_USER = 'user';
//     process.env.DB_PASSWORD = 'pass';
//     process.env.DB_NAME = 'mysql_db';

//     process.env.PG_HOST = 'localhost';
//     process.env.PG_USER = 'pg_user';
//     process.env.PG_PASSWORD = 'pg_pass';
//     process.env.PG_DATABASE = 'pg_db';
//     process.env.PG_PORT = '5432';

//     process.env.MONGO_URI = 'mongodb://localhost:27017';
//     process.env.MONGO_DB_NAME = 'mongo_db';

//     process.env.FIREBASE_CREDENTIALS = JSON.stringify({ projectId: 'fake-project' });
//   });

//   afterEach(() => {
//     // Réinitialiser les mocks entre chaque test
//     jest.clearAllMocks();
//   });

//   it('devrait retourner une instance de MySQL pool', async () => {
//     const mysqlInstance = await Database.getInstance('mysql');
//     expect(mysqlInstance).toEqual({ mysqlPool: true });
//     expect(mysql.createPool).toHaveBeenCalled();
//   });

//   it('devrait retourner une instance de PostgreSQL pool', async () => {
//     const pgInstance = await Database.getInstance('postgres');
//     expect(pgInstance).toEqual({ pgPool: true });
//     expect(Pool).toHaveBeenCalled();
//   });

//   it('devrait retourner une instance de MongoDB', async () => {
//     const mongoInstance = await Database.getInstance('mongodb');
//     expect(mockConnect).toHaveBeenCalled();
//     expect(mockDb).toHaveBeenCalledWith(process.env.MONGO_DB_NAME);
//     expect(mongoInstance).toEqual({ mongoDb: true });
//   });

//   it('devrait retourner une instance de Firebase Firestore', async () => {
//     // Simuler que l'app Firebase n'est pas encore initialisée
//     (admin.apps as any).length = 0;
//     const firebaseInstance = await Database.getInstance('firebase');
//     expect(admin.initializeApp).toHaveBeenCalled();
//     expect(mockFirestore).toHaveBeenCalled();
//     expect(firebaseInstance).toEqual({ firebaseFirestore: true });
//   });

//   it('devrait renvoyer la même instance pour le même type (singleton)', async () => {
//     const instance1 = await Database.getInstance('mysql');
//     const instance2 = await Database.getInstance('mysql');
//     expect(instance1).toBe(instance2);
//   });

//   it('devrait lever une erreur pour un type de base de données non supporté', async () => {
//     await expect(Database.getInstance('prisma' as any)).rejects.toThrow('Type de base de données non supporté');
//   });
// });
