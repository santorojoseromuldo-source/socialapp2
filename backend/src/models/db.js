const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../database.sqlite'), (err) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the SQLite database.');
    initDb();
  }
});

function initDb() {
  db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('user', 'business', 'delivery', 'entrepreneur')) DEFAULT 'user'
    )`);

    // Products table
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      business_id INTEGER,
      FOREIGN KEY(business_id) REFERENCES users(id)
    )`);

    // Orders table
    db.run(`CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER,
      business_id INTEGER,
      delivery_id INTEGER,
      status TEXT DEFAULT 'pending',
      total REAL,
      FOREIGN KEY(customer_id) REFERENCES users(id),
      FOREIGN KEY(business_id) REFERENCES users(id),
      FOREIGN KEY(delivery_id) REFERENCES users(id)
    )`);
  });
}

module.exports = db;
