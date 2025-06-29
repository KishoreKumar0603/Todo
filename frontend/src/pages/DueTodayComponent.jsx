import React from "react";

import TaskCard from "../assets/components/TaskCard"; // import your TaskCard

const DueTodayComponent = ({ tasks, onEditTask, onDeleteTask }) => {
  return (
    <div className="container mt-3">
      <h3>Tasks Due Today</h3>

      {tasks.length === 0 ? (
        <p className="text-muted">No tasks due today.</p>
      ) : (
        <div className="row">
          {tasks.map(task => (
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

export default DueTodayComponent;
