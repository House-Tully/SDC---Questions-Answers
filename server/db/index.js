const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  host: process.env.HOST,
  user: 'ubuntu',
  port: process.env.PORT,
  database: process.env.DATABASE,
  password: process.env.PSQLPW
})

pool.connect()

module.exports = pool;