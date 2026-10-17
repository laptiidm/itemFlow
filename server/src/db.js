import { mkdirSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const dataDirectory = new URL('../data/', import.meta.url);
mkdirSync(dataDirectory, { recursive: true });

const db = new DatabaseSync(new URL('items.sqlite', dataDirectory));

// Create and seed together, so restarts never restore deleted sample items.
db.exec('BEGIN IMMEDIATE');
try {
  const tableExists = db.prepare(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'items'"
  ).get();

  db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL CHECK (length(trim(name)) > 0),
      quantity INTEGER NOT NULL CHECK (quantity >= 0)
    ) STRICT
  `);

  if (!tableExists) {
    const insert = db.prepare('INSERT INTO items (name, quantity) VALUES (?, ?)');
    insert.run('Keyboard', 10);
    insert.run('Mouse', 5);
  }
  db.exec('COMMIT');
} catch (error) {
  db.exec('ROLLBACK');
  db.close();
  throw error;
}

export default db;
