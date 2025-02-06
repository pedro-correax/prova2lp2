import sqlite3 from 'sqlite3';
import { faker } from '@faker-js/faker';

const db = new sqlite3.Database('test.db');

const initDatabase = async () => {
  // Create tables
  await new Promise<void>((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        age INTEGER NOT NULL,
        city TEXT NOT NULL
      )
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  await new Promise<void>((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        stock INTEGER NOT NULL,
        category TEXT NOT NULL
      )
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  await new Promise<void>((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        total REAL NOT NULL,
        status TEXT NOT NULL,
        orderDate TEXT NOT NULL
      )
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Insert sample data
  for (let i = 0; i < 50; i++) {
    // Insert users
    await new Promise<void>((resolve, reject) => {
      db.run(
        'INSERT INTO users (name, email, age, city) VALUES (?, ?, ?, ?)',
        [
          faker.person.fullName(),
          faker.internet.email(),
          faker.number.int({ min: 18, max: 80 }),
          faker.location.city()
        ],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    // Insert products
    await new Promise<void>((resolve, reject) => {
      db.run(
        'INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)',
        [
          faker.commerce.productName(),
          faker.number.float({ min: 10, max: 1000 }),
          faker.number.int({ min: 0, max: 100 }),
          faker.commerce.department()
        ],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    // Insert orders
    await new Promise<void>((resolve, reject) => {
      db.run(
        'INSERT INTO orders (userId, total, status, orderDate) VALUES (?, ?, ?, ?)',
        [
          faker.number.int({ min: 1, max: 50 }),
          faker.number.float({ min: 50, max: 5000 }),
          faker.helpers.arrayElement(['pending', 'completed', 'cancelled']),
          faker.date.past().toISOString()
        ],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }
};

initDatabase()
  .then(() => {
    console.log('Database initialized successfully');
    db.close();
  })
  .catch((error) => {
    console.error('Error initializing database:', error);
    db.close();
  });