const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "skorpion19922111",
  host: "localhost",
  port: 5432,
  database: "users",
});
// const pool = new Pool({
//   user: "sura",
//   port: 5432,
//   database: "users",
// });

module.exports = pool;
