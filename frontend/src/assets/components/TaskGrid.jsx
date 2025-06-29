import React from "react";
import TaskCard from "./TaskCard";
import { IoPlayCircleOutline } from "react-icons/io5";
import { RiProgress1Line } from "react-icons/ri";
import { IoCheckmarkDoneCircleOutline, IoBanOutline } from "react-icons/io5"; // Added no task icon
import { BsListTask } from "react-icons/bs";
const TaskGrid = ({ tasks, onAddTask, onEditTask, onDeleteTask }) => {
  const toStart = tasks.filter(
    (t) => t.status === "to_start" || t.status === "pending"
  );
  const inProgress = tasks.filter(
    (t) => t.status === "in_progress" || t.status === "in-progress"
  );
  const completed = tasks.filter((t) => t.status === "completed");

  const sections = [
    {
      icon: IoPlayCircleOutline,
      title: "To Start",
      data: toStart,
      color: "primary",
    },
    {
      icon: RiProgress1Line,
      title: "In Progress",
      data: inProgress,
      color: "warning",
    },
    {
      icon: IoCheckmarkDoneCircleOutline,
      title: "Completed",
      data: completed,
      color: "success",
    },
  ];

  return (
    <div className="container mt-4">
      <div className="row g-3">
        {sections.map((section, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="p-3 rounded shadow-sm bg-light">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex justify-content-center align-items-center">
                  <section.icon className={`text-primary fs-4 me-2`} />
                  <h6 className="mb-0 text-dark">{section.title}</h6>
                </div>

                <span
                  className="d-inline-flex justify-content-center align-items-center"
                  style={{
                    backgroundColor:
                      section.color === "primary"
                        ? "#e6f3ff" // light blue
                        : section.color === "success"
                        ? "#e6f9e6" // light green
                        : section.color === "warning"
                        ? "#fff8e1" // light yellow
                        : "#e6f3ff", // default light blue
                    color:
                      section.color === "primary"
                        ? "#007bff" // blue text
                        : section.color === "success"
                        ? "#28a745" // green text
                        : section.color === "warning"
                        ? "#ffc107" // yellow text
                        : "#007bff",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    fontSize: "14px",
                  }}
                >
                  {section.data.length}
                </span>
              </div>

              {section.data.length === 0 ? (
                <div className="text-center text-muted py-4">
                  <BsListTask size={40} className="mb-2" />
                  <div>No tasks available</div>
                </div>
              ) : (
                section.data.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskGrid;
