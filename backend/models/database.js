import sqlite3 from 'sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbDir = join(__dirname, '..', 'db');
const dbPath = join(dbDir, 'travel_app.db');

// Ensure db directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

// Initialize database
export function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          password TEXT NOT NULL,
          avatar TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Trips table
      db.run(`
        CREATE TABLE IF NOT EXISTS trips (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          title TEXT NOT NULL,
          destination TEXT NOT NULL,
          start_date TEXT NOT NULL,
          end_date TEXT NOT NULL,
          budget REAL NOT NULL,
          spent REAL DEFAULT 0,
          image TEXT,
          status TEXT DEFAULT 'planning',
          travelers INTEGER DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);

      // Itinerary items table
      db.run(`
        CREATE TABLE IF NOT EXISTS itinerary_items (
          id TEXT PRIMARY KEY,
          trip_id TEXT NOT NULL,
          date TEXT NOT NULL,
          time TEXT NOT NULL,
          title TEXT NOT NULL,
          description TEXT,
          location TEXT,
          category TEXT NOT NULL,
          cost REAL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (trip_id) REFERENCES trips(id)
        )
      `);

      // Packing items table
      db.run(`
        CREATE TABLE IF NOT EXISTS packing_items (
          id TEXT PRIMARY KEY,
          trip_id TEXT NOT NULL,
          item TEXT NOT NULL,
          category TEXT NOT NULL,
          packed BOOLEAN DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (trip_id) REFERENCES trips(id)
        )
      `);

      // Notes table
      db.run(`
        CREATE TABLE IF NOT EXISTS notes (
          id TEXT PRIMARY KEY,
          trip_id TEXT NOT NULL,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (trip_id) REFERENCES trips(id)
        )
      `, (err) => {
        if (err) reject(err);
        else resolve(db);
      });
    });
  });
}

export function getDatabase() {
  return db;
}

export function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

export function getQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function getAllQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
