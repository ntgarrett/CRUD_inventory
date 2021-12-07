const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');
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
    res.json(error.message);
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const allUsers = await pool.query(`
      SELECT 
      CONCAT(last_name, '\, ', first_name) AS name,
      user_id, 
      birth_date,
      hire_date,
      administrator
      FROM users;
    `);

    res.json({ success: true, employees: allUsers.rows})
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Add a new user
app.post('/addemployee', async (req, res) => {
  try {
    const id = req.body.user_id;
    const password = req.body.password;
    const fName = req.body.first_name;
    const lName = req.body.last_name;
    const birthDate = req.body.birth_date;
    const hireDate = req.body.hire_date;
    const isAdmin = req.body.administrator;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newEmployee = await pool.query(`
      INSERT INTO users (user_id, password, first_name, last_name, birth_date, hire_date, administrator)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
      `,
      [id, hashedPassword, fName, lName, birthDate, hireDate, isAdmin]
    );

    res.json({ success: true, employee: newEmployee.rows[0] });
  } catch (error) {
    res.json({ success: false, error: error.message })
  }
});

// Get user details
app.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await pool.query(`
      SELECT json_build_object(
        'first_name', first_name,
        'last_name', last_name, 
        'birth_date', birth_date,
        'hire_date', hire_date
      ) 
      AS user
      FROM users
      WHERE user_id = $1;
      `, 
      [userId]
    );

    if (result.rows.length) {
      res.json(result.rows[0]);
    } else {
      res.send('User ID does not exist');
    }
  } catch (error) {
    res.json(error.message);
  }
});

// Verify user's password
app.post('/user/check', async (req, res) => {
  try {
    const id = req.body.userId;
    const password = req.body.password;

    const fetchedUser = await pool.query(`
      SELECT user_id, password
      FROM users
      WHERE user_id = $1;
      `,
      [id]
    );

    if (fetchedUser.rowCount) {
      if (await bcrypt.compare(password, fetchedUser.rows[0].password)) {
        res.json({ success: true });
      } else {
        res.json({ success: false })
      }
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.json(error.message);
  }
});

// Change user password
app.put('/user/password', async (req, res) => {
  try {
    const id = req.body.id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const fetchedUser = await pool.query(`
      SELECT user_id, password
      FROM users
      WHERE user_id = $1;
      `,
      [id]
    );

    if (fetchedUser.rowCount) {
      if (await bcrypt.compare(oldPassword, fetchedUser.rows[0].password)) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const result = await pool.query(`
          UPDATE users
          SET password = $2
          WHERE user_id = $1; 
          `, 
          [id, hashedPassword]
        );

        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Authentication failed."})
      }
    } else {
      res.json({ success: false, message: "Authentication failed."})
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Delete a user
app.delete('/user/delete', async (req, res) => {
  try {
    const id = req.body.userId;

    const deletedUser = await pool.query(`
      DELETE FROM users
      WHERE user_id = $1;
    `,
    [id]
    ).then(response => response.rowCount);

    if (deletedUser) {
      res.json({ success: true, message: `User with ID ${id} has been deleted.`});
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ success: false, error: error.message})
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
    res.json(error.message);
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
    
    const fetchedUser = await pool.query(`
      SELECT user_id, password, administrator
      FROM users
      WHERE user_id = $1;
      `,
      [clientId]
    );

    if (fetchedUser.rowCount) {
      if (await bcrypt.compare(clientPassword, fetchedUser.rows[0].password)) {
        const userObject = {
          user_id: fetchedUser.rows[0].user_id,
          administrator: fetchedUser.rows[0].administrator
        };

        const message = { success: true, user: userObject}
        res.json(message);
      } else {
        const message = { success: false, message: 'Authentication failed.' }
        res.json(message);
      }
    } else {
      const message = { success: false, message: 'Authentication failed.' }
      res.json(message);
    }
  } catch (error) {
    res.json(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});