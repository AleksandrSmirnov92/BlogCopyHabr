const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  password: "skorpion19922111",
  host: "localhost",
  port: 5432,
  database: "users",
});
module.exports = pool;
