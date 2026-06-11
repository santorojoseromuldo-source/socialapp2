const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/products', (req, res) => {
  const db = require('./src/models/db');
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.get('/', (req, res) => {
  res.send('Delivery Plus API Running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
