import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Sonal@971",
  database: "virtual_tryon",
  waitForConnections: true,
  connectionLimit: 10
});

export default pool;