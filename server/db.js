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

// async function testDbConnection() {
//   try {
//     const [rows] = await db.query("SELECT 1");
//     console.log("✅ Database connected successfully");
//   } catch (err) {
//     console.error("❌ Database connection failed:", err.message);
//     process.exit(1);
//   }
// }

// await testDbConnection();

//Create DB CRUD Methods 

// Create User 

export async function createUser ( email, phone_number, age, password) {
    const [result] = await db.query(`
        INSERT INTO users (email, phone_number, age, password_hashed)
        VALUES (?, ?, ?, ?)
        `, [email, phone_number, age, password])
        const id = result.insertId
        return await getOneUser(id);
}

// Get One User 

export async function getOneUser(id) {
    const [rows] = await db.query(`
        SELECT id, email, phone_number, age, created_at
        FROM users
        WHERE id = ?
        `, [id])
        return rows;
}



export default db
