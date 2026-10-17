import express from 'express';
import db from './db.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/items', (req, res) => {
  res.json(db.prepare('SELECT id, name, quantity FROM items ORDER BY id').all());
});

app.post('/api/items', (req, res) => {
  const { name, quantity } = req.body ?? {};

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name must be a non-empty string.' });
  }
  if (!Number.isInteger(quantity) || quantity < 0) {
    return res.status(400).json({ error: 'Quantity must be a non-negative integer.' });
  }

  const result = db.prepare('INSERT INTO items (name, quantity) VALUES (?, ?)')
    .run(name.trim(), quantity);
  const item = db.prepare('SELECT id, name, quantity FROM items WHERE id = ?')
    .get(Number(result.lastInsertRowid));
  res.status(201).json(item);
});

app.patch('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID must be a positive integer.' });
  }

  const item = db.prepare('SELECT id, name, quantity FROM items WHERE id = ?').get(id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  const body = req.body ?? {};
  const hasName = Object.hasOwn(body, 'name');
  const hasQuantity = Object.hasOwn(body, 'quantity');
  if (!hasName && !hasQuantity) {
    return res.status(400).json({ error: 'Provide name or quantity.' });
  }
  if (hasName && (typeof body.name !== 'string' || !body.name.trim())) {
    return res.status(400).json({ error: 'Name must be a non-empty string.' });
  }
  if (hasQuantity && (!Number.isInteger(body.quantity) || body.quantity < 0)) {
    return res.status(400).json({ error: 'Quantity must be a non-negative integer.' });
  }

  db.prepare('UPDATE items SET name = ?, quantity = ? WHERE id = ?').run(
    hasName ? body.name.trim() : item.name,
    hasQuantity ? body.quantity : item.quantity,
    id
  );
  res.json(db.prepare('SELECT id, name, quantity FROM items WHERE id = ?').get(id));
});

app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID must be a positive integer.' });
  }

  const result = db.prepare('DELETE FROM items WHERE id = ?').run(id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
