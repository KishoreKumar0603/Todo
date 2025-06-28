import React from "react";
import TaskCard from "./TaskCard";

const TaskGrid = ({ tasks, onAddTask, onEditTask, onDeleteTask }) => {
  const toStart = tasks.filter(t => t.status === 'to_start' || t.status === 'pending');
  const inProgress = tasks.filter(t => t.status === 'in_progress' || t.status === 'in-progress');
  const completed = tasks.filter(t => t.status === 'completed');

  return (
    <div className="container mt-4">
      <div className="row g-3">
        {[
          { title: "To Start", data: toStart, color: "primary", border: "border-primary" },
          { title: "In Progress", data: inProgress, color: "warning", border: "border-warning" },
          { title: "Completed", data: completed, color: "success", border: "border-success" },
        ].map((section, idx) => (
          <div className="col-md-4" key={idx}>
            <div className={`p-3 rounded shadow-sm bg-light`}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className={`mb-0 text-${section.color}`}>
                  {section.title}
                </h6>
                <span className={`badge bg-${section.color}`}>
                  {section.data.length}
                </span>
              </div>

              {section.data.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}

              {section.title === "To Start" && (
                <button className="btn btn-outline-primary w-100 mt-2" onClick={onAddTask}>
                  + Add New
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskGrid;
