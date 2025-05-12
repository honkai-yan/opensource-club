import mysql from "mysql2/promise";

const dbAccess: mysql.ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT as string),
};

// 创建连接池
const pool = mysql.createPool(dbAccess);

export async function query(sql: string, values?: any[]) {
  const [result] = await pool.query(sql, values);
  return result;
}