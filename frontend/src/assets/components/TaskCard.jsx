import React from "react";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getPriorityBadge = (priority) => {
    if (priority === "high") return <span className="badge bg-danger">High</span>;
    if (priority === "medium") return <span className="badge bg-warning text-dark">Medium</span>;
    return <span className="badge bg-success">Low</span>;
  };

  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body p-2">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <h6 className="mb-0">{task.title}</h6>
          <div className="dropdown">
            <button
              className="btn btn-sm btn-light"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ⋮
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item" onClick={() => onEdit(task)}>Edit</button>
              </li>
              <li>
                <button className="dropdown-item text-danger" onClick={() => onDelete(task._id)}>Delete</button>
              </li>
            </ul>
          </div>
        </div>

        <p className="card-text small mb-1">{task.description}</p>

        <div className="d-flex justify-content-between align-items-center">
          {getPriorityBadge(task.priority)}
          <small className="text-muted">
            {new Date(task.dueDate).toISOString().split('T')[0]}
          </small>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
