const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  database: 'qa',
  password: process.env.PSQLPW
})

pool.connect()

module.exports = pool;