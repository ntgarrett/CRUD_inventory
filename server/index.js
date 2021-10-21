const express = require('express');
const cors = require('cors');
const pool = require('./db/db');

const app = express();
app.use(express.json());
app.use(cors());

// Get all products
app.get('/', async (req, res) => {
  try {
    const inventory = await pool.query(`SELECT * FROM product;`);
    res.json(inventory.rows);
  } catch (error) {
    res.send(error.message);
  }
});

// Add a product
app.post('/addproduct', async (req, res) => {
  try {
    const { name, description, category, count } = req.body;
    const product = await pool.query(`INSERT INTO product (name, description, category, count) VALUES ($1,$2,$3,$4) RETURNING *;`, [name, description, category, count]);
    res.json(product.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

// Get a product
app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query(`SELECT * FROM product WHERE id = $1`, [id]);
    res.json(product.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
});

// Update a product
app.put('/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const { name, description, category, count } = req.body;
    
    const updatedProduct = await pool.query(
      `UPDATE product
      SET name = $1, description = $2, category = $3, count = $4
      WHERE id=$5;`, 
      [name, description, category, count, id]
    );
    res.json(updatedProduct.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
});

// Delete a product
app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await pool.query(`DELETE FROM product WHERE id = $1;`, [id]);
    res.json('Deleted product successfully.');
  } catch (error) {
    res.json(error.message);
  }
});

app.listen('3306', () => {
  console.log('Server started...');
});
