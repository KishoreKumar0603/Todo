import Task from "../models/Task.js";

// ✅ Create Task
export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      owner: req.user.id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get All Tasks (owned + shared) with filters, pagination, sorting
export const getTasks = async (req, res) => {
  try {
    const {
      status,
      priority,
      dueToday,
      overdue,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
    } = req.query;

    const query = {
      $or: [{ owner: req.user.id }, { sharedWith: req.user.id }],
    };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    if (dueToday === "true") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      query.dueDate = { $gte: today, $lt: tomorrow };
    }
    if (overdue === "true") {
      query.dueDate = { $lt: new Date() };
      query.status = { $ne: "completed" };
    }
    if (req.query.date) {
      const selectedDate = new Date(req.query.date);
      selectedDate.setHours(0, 0, 0, 0);
      const nextDate = new Date(selectedDate);
      nextDate.setDate(selectedDate.getDate() + 1);
      query.dueDate = { $gte: selectedDate, $lt: nextDate }; // use dueDate 
    }

    const tasks = await Task.find(query)
      .sort({ [sortBy]: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Single Task (owner/shared)
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (
      task.owner.toString() !== req.user.id &&
      !task.sharedWith.map((id) => id.toString()).includes(req.user.id)
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Task (only owner)
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
    if (!task)
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });

    Object.assign(task, req.body);
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete Task (only owner)
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!task)
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Share Task with user
export const shareTask = async (req, res) => {
  try {
    const { userId } = req.body;
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });

    if (!task)
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });

    if (!task.sharedWith.includes(userId)) {
      task.sharedWith.push(userId);
      await task.save();
    }

    res.json({ message: "Task shared successfully", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
