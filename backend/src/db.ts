const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   password: "skorpion19922111",
//   host: "localhost",
//   port: 5432,
//   database: "users",
// });
const pool = new Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  port: 5432,
  database: "postgres",
});
pool.connect();
module.exports = pool;
