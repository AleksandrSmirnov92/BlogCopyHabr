const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   password: "skorpion19922111",
//   host: "localhost",
//   port: 5432,
//   database: "users",
// });
const pool = new Pool({
  user: "sura",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "users",
});
// pool.connect();
module.exports = pool;
