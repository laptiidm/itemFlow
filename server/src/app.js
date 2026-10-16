import express from 'express';

const app = express();
const port = 3000;

const items = [
  { id: 1, name: 'Keyboard', quantity: 10 },
  { id: 2, name: 'Mouse', quantity: 5 },
];

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
