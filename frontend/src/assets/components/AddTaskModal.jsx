import React, { useEffect, useState } from "react";

const AddTaskModal = ({ onSave, currentTask }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    status: "to_start",
  });

  // Prefill form when editing, retain empty when adding
  useEffect(() => {
    if (currentTask) {
      setForm({
        title: currentTask.title || "",
        description: currentTask.description || "",
        dueDate: currentTask.dueDate ? currentTask.dueDate.split("T")[0] : "",
        priority: currentTask.priority || "low",
        status: currentTask.status || "to_start",
      });
    } else {
      setForm({
        title: "",
        description: "",
        dueDate: "",
        priority: "low",
        status: "to_start",
      });
    }
  }, [currentTask]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal fade" id="addTaskModal" tabIndex="-1">
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">{currentTask ? "Edit Task" : "Add New Task"}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <input
              className="form-control mb-2"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              className="form-control mb-2"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              className="form-control mb-2"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              required
            />
            <select
              className="form-select mb-2"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              className="form-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="to_start">To Start</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" className="btn btn-primary">
              {currentTask ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;