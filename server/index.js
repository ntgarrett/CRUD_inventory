const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const pool = require('./db/db');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
const PORT = 3306;

// Get all products
app.get('/', async (req, res) => {
  try {
    const inventory = await pool.query(`
      SELECT * FROM product;
    `);

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
    ).then(response => { return response.rows[0] });
    
    res.json(updatedProduct);
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
    
    res.json(deletedProduct);
  } catch (error) {
    res.json(error.message);
  }
});

// Login user
app.post('/login', async (req, res) => {
  try {
    const clientId = req.body.user_id;
    const clientPassword = req.body.password;
    
    const result = await pool.query(`
      SELECT * FROM users
      WHERE user_id = $1 AND password = $2;
    `, [clientId, clientPassword]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json(user);
    } else {
      res.json('Incorrect username/password');
    }
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
