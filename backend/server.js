import express from 'express';
import dotenv from "dotenv";
import {sql} from './config/db.js';
import tasksroute from './routes/tasksRoute.js';

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5001;

async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS tasks(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )`;
        console.log("Database is initialized successfully");
    } catch (error) {
        console.log("Error initializing database:", error)
        process.exit(1)
    }
}

app.use('/api/tasks', tasksroute);

initDB().then(()=> {
    app.listen(PORT,()=>{
    console.log("Server is running on port:",PORT);
    });
});