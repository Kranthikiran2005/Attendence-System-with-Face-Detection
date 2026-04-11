const express = require('express');
const app = express();

const db = require('./db');

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM xyz');
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});