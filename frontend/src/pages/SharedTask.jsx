import React from "react";
import TaskCard from "../assets/components/TaskCard";

const SharedTask = ({ tasks, onEditTask, onDeleteTask, loggedInUserId }) => {
  // Separate shared *to others* and *from others*
  const sharedByMe = tasks.filter((task) =>
  task.owner &&
  task.owner._id === loggedInUserId &&
  task.sharedWith &&
  task.sharedWith.length > 0
);



  const sharedWithMe = tasks.filter(
    (task) =>
      task.owner !== loggedInUserId &&
      task.sharedWith &&
      task.sharedWith.includes(loggedInUserId)
  );

  return (
    <div className="container">
      <h4 className="mb-3">Tasks Shared By You</h4>
      {sharedByMe.length === 0 && <p>No tasks shared by you.</p>}
      {sharedByMe.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onShare={() => {}}
          currentUserId={loggedInUserId}
        />
      ))}

      <hr />

      <h4 className="mb-3">Tasks Shared With You</h4>
      {sharedWithMe.length === 0 && <p>No tasks shared with you.</p>}
      {sharedWithMe.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onShare={() => {}}
          currentUserId={loggedInUserId}
        />
      ))}
    </div>
  );
};

export default SharedTask;
