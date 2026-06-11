const db = require('../models/db');

exports.getProducts = (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
};

exports.createOrder = (req, res) => {
  const { customer_id, business_id, total } = req.body;
  db.run('INSERT INTO orders (customer_id, business_id, total, status) VALUES (?, ?, ?, ?)',
    [customer_id, business_id, total, 'pending'],
    function(err) {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: this.lastID });
    }
  );
};
