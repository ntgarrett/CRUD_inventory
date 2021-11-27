const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'secret',
  host: 'localhost',
  port: 5432,
  database: 'inventory'
});

module.exports = pool;