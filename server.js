const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'db.json');
let db = {};
try {
  const data = fs.readFileSync(dbPath, 'utf8');
  db = JSON.parse(data);
} catch (err) {
  console.error('Ошибка чтения db.json:', err);
  db = { bestsellers: [], coffee: [], goods: [], contacts: [] };
}

app.get('/bestsellers', (req, res) => {
  res.json(db.bestsellers || []);
});

app.get('/coffee', (req, res) => {
  res.json(db.coffee || []);
});

app.get('/goods', (req, res) => {
  res.json(db.goods || []);
});

app.get('/:resource/:id', (req, res) => {
  const { resource, id } = req.params;
  const items = db[resource];
  if (!items) return res.status(404).json({ error: 'Resource not found' });
  const item = items.find(it => it.id == id);
  if (item) res.json(item);
  else res.status(404).json({ error: 'Item not found' });
});

app.post('/contacts', (req, res) => {
  console.log('Получен контакт:', req.body);
  res.json({ status: 'ok', message: 'Contact saved (demo)' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
