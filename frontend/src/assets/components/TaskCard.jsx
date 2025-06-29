import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const TaskCard = ({ task, onEdit, onDelete, onShare, currentUserId }) => {
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

  const isOwnedByUser = (task.owner._id || task.owner) === currentUserId;

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
                <button className="dropdown-item" onClick={() => onEdit(task)}
                  
                  disabled={!isOwnedByUser} >
                  Edit
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => onShare(task)}
                  disabled={!isOwnedByUser} // disable share for shared tasks
                >
                  Share
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => onDelete(task._id)}
                  disabled={!isOwnedByUser} 
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>

        <p className="card-text text-muted small mb-3">{task.description}</p>

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            {getPriority(task.priority)}
            {!isOwnedByUser && (
              <span className="text-muted small ms-2">(Shared)</span>
            )}
          </div>
          <small className="text-muted">
            {new Date(task.dueDate).toISOString().split("T")[0]}
          </small>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
