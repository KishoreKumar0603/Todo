import Task from "../models/Task.js";
import User from "../models/User.js";

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
      query.dueDate = { $gte: selectedDate, $lt: nextDate };
    }

    const tasks = await Task.find(query)
      .populate("owner", "name email")
      .sort({ [sortBy]: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    tasks.forEach(task => {
      task.isShared = task.owner._id.toString() !== req.user.id;
    });

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

//share task with users

export const shareTask = async (req, res) => {
  try {
    const { userId } = req.body;

    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
    if (!task)
      return res.status(404).json({ message: "Task not found or unauthorized" });

    const userExists = await User.findById(userId);
    if (!userExists)
      return res.status(400).json({ message: "Invalid userId" });

    // Ensure no duplicates (safer ObjectId comparison)
    if (!task.sharedWith.map(id => id.toString()).includes(userId)) {
      task.sharedWith.push(userId);
      await task.save();
    }

    // Optionally populate sharedWith users
    await task.populate("sharedWith", "name email");

    res.json({ message: "Task shared successfully", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
