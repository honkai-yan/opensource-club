import { ConnectionOptions, createPool } from "mysql2/promise";

const dbAccess: ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT as string),
  maxIdle: 10,
};

// 创建连接池
const pool = createPool(dbAccess);

export async function query(sql: string, values?: any[]) {
  const [result] = await pool.query(sql, values);
  return result;
}

process.on("exit", () => {
  pool.end();
});
