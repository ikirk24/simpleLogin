import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config(); 

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE
})

async function testDbConnection() {
  try {
    const [rows] = await db.query("SELECT 1");
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
}

await testDbConnection();


export default db