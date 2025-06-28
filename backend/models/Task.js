// models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    status: { type: String, enum: ["to_start", "in_progress", "completed"], default: "to_start" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });


const Task = mongoose.model("Task", taskSchema);


export default Task;