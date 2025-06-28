import express from "express";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    shareTask
} from "../controllers/taskController.js";

import authenticateToken from "../middlewares/authenticateToken.js";
const router = express.Router();

// All routes protected with JWT
router.use(authenticateToken);

// Create Task
router.post("/", createTask);

// Get All Tasks with filters, pagination, sorting
router.get("/", getTasks);

// Get Single Task by ID
router.get("/:id", getTaskById);

// Update Task (only owner)
router.put("/:id", updateTask);

// Delete Task (only owner)
router.delete("/:id", deleteTask);

//task sharing

router.put("/:id/share", shareTask);

export default router;
