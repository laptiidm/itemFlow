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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
