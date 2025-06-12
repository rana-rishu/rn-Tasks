import express from 'express';
import { getTasksByUserId, updateTask } from '../controllers/tasksController.js';
import { createTask } from '../controllers/tasksController.js';
import  { deleteTask } from  '../controllers/tasksController.js';


const router = express.Router();

router.get("/", async (req, res) => {
    res.send(" Its Working");
})

router.get("/:user_id",getTasksByUserId);

router.post("/", createTask);
 

router.delete("/:id", deleteTask);

router.patch("/:id", updateTask);





export default router;