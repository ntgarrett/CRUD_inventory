const express = require('express');
const cors = require('cors');
const pool = require('./db/db');

const app = express();
app.use(express.json());
app.use(cors());

// Get all products
app.get('/', async (req, res) => {
  try {
    const inventory = await pool.query(`
      SELECT * FROM product;
    `);

    console.log('GET "/" - called.');
    res.json(inventory.rows);
  } catch (error) {
    res.send(error.message);
  }
});

// Get a product
app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query(`
      SELECT * FROM product
      WHERE id = $1
      `, 
      [id]
    );
    
    console.log('GET "/:id" - called.');
    res.json(product.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
});

// Add a product
app.post('/addproduct', async (req, res) => {
  try {
    const { name, description, category, count } = req.body;
    const product = await pool.query(`
      INSERT INTO product (name, description, category, count) 
      VALUES ($1,$2,$3,$4)
      RETURNING *;
      `, 
      [name, description, category, count]
    );
    
    console.log('POST "/addproduct" - called.');
    res.json(product.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
});

// Update a product
app.put('/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const { name, description, category, count } = req.body;
    
    const updatedProduct = await pool.query(`
      UPDATE product
      SET name = $1, description = $2, category = $3, count = $4
      WHERE id=$5
      RETURNING *;
      `, 
      [name, description, category, count, id]
    );
    
    console.log('PUT "/:id" - called.');
    res.json(updatedProduct.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
});

// Delete a product
app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await pool.query(`
      DELETE FROM product 
      WHERE id = $1
      RETURNING *;
      `, 
      [id]
    ).then(response => { return response.rows[0] });
    
    console.log('DELETE "/:id" - called.');
    res.json(deletedProduct);
  } catch (error) {
    res.json(error.message);
  }
});

app.listen('3306', () => {
  console.log(`Server started on port 3306...`);
});
