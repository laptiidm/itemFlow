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

app.patch('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID must be a positive integer.' });
  }

  const item = items.find((item) => item.id === id);
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

  if (hasName) item.name = body.name.trim();
  if (hasQuantity) item.quantity = body.quantity;
  res.json(item);
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
