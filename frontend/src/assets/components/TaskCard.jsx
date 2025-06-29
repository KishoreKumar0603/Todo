import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getPriority = (priority) => {
    if (priority === "high")
      return (
        <span className="text-danger d-flex align-items-center">
          <FaExclamationTriangle className="me-1" /> High
        </span>
      );
    if (priority === "medium")
      return (
        <span className="text-warning d-flex align-items-center">
          <FaExclamationTriangle className="me-1" /> Medium
        </span>
      );
    return (
      <span className="text-success d-flex align-items-center">
        <FaExclamationTriangle className="me-1" /> Low
      </span>
    );
  };

  return (
    <div className="card mb-2 shadow-sm border-0">
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <strong>{task.title}</strong>
          <div className="dropdown">
            <button
              className="btn btn-sm btn-light border"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ⋯
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item" onClick={() => onEdit(task)}>
                  Edit
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => onDelete(task._id)}
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>

        <p className="card-text text-muted small mb-3">
          {task.description}
        </p>

        <div className="d-flex justify-content-between align-items-center">
          {getPriority(task.priority)}
          <small className="text-muted">
            {new Date(task.dueDate).toISOString().split("T")[0]}
          </small>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
