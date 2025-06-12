import express from 'express';
import { sql} from '../config/db.js';


export async function getTasksByUserId(req, res) {
        try {
            const {user_id} = req.params;
            if(!user_id){
                return res.status(400).json({error:"User ID is required"})
            }
            const tasks = await sql`SELECT * FROM tasks WHERE user_id = ${user_id} ORDER BY created_at DESC`;
            res.status(200).json(tasks);
        } catch (error) {
            console.log("Error fetching tasks:", error)
            res.status(500).json({error:"Internal server error"})
        }
}

export async function createTask(req, res) {
    try {
    const{title,user_id}=req.body;
    if(!title || !user_id){
        return res.status(400).json({error:"All fields are required"})
    }

   const task = await sql`INSERT INTO tasks (title,user_id) VALUES (${title}, ${user_id})
   RETURNING *`;
    console.log(task);
   res.status(201).json(task[0]);

 } catch (error) {
    console.log("Error creating task:", error)
    res.status(500).json({error:"Internal server error"})
 }   

}

export async function deleteTask(req, res){
    try {
        const {id} = req.params;
        if(!id || isNaN(parseInt(id))){
            return res.status(400).json({error:"Task ID is required"})
        }
        const task = await sql`DELETE FROM tasks WHERE id = ${id} RETURNING *`;
        if(task.length === 0){
            return res.status(404).json({error:"Task not found"})
        }
        res.status(200).json({message:"Task deleted successfully"});
    } catch (error) {
        console.log("Error deleting task:", error)
        res.status(500).json({error:"Internal server error"})
    }
}

export async function updateTask(req, res) {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    await sql`UPDATE tasks SET completed = ${completed} WHERE id = ${id}`;
    res.json({ message: 'Task updated successfully' });
  } catch (err) {
    console.error("Update error:", err); 
    res.status(500).json({ error: 'Failed to update task' });
  }
}
