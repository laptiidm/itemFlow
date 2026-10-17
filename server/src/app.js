import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

const items = [
  { id: 1, name: 'Keyboard', quantity: 10 },
  { id: 2, name: 'Mouse', quantity: 5 },
];
let nextId = 3;

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const { name, quantity } = req.body ?? {};

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name must be a non-empty string.' });
  }
  if (!Number.isInteger(quantity) || quantity < 0) {
    return res.status(400).json({ error: 'Quantity must be a non-negative integer.' });
  }

  const item = { id: nextId++, name: name.trim(), quantity };
  items.push(item);
  res.status(201).json(item);
});

app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID must be a positive integer.' });
  }

  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found.' });
  }

  items.splice(index, 1);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
