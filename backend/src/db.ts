const Pool = require("pg").Pool;
export const pool = new Pool({
  user: "postgres",
  password: "skorpion19922111",
  host: "localhost",
  port: 5432,
  database: "habr",
});
