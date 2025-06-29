import React from "react";
import TaskCard from "../assets/components/TaskCard";
const HighPriorityComponent = ({ tasks, onEditTask, onDeleteTask }) => {
  // Filter only high priority tasks
  const highPriorityTasks = tasks.filter(task => task.priority === "high");

  return (
    <div className="container mt-3">
      <h3>High Priority Tasks</h3>

      {highPriorityTasks.length === 0 ? (
        <p className="text-muted">No high priority tasks.</p>
      ) : (
        <div className="row">
          {highPriorityTasks.map(task => (
            <div className="col-md-4 mb-3" key={task._id}>
              <TaskCard
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HighPriorityComponent;
