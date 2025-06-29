import React from 'react';
import { FaList, FaCheckCircle, FaClock, FaUsers } from 'react-icons/fa';
import TaskCard from '../assets/components/TaskCard';
// import your TaskCard component

const Overview = ({ tasks, onEditTask, onDeleteTask }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "completed");
  const inProgressTasks = tasks.filter(task => task.status === "in_progress" || task.status === "in-progress");
  const sharedTasks = tasks.filter(task => task.isShared); // adjust if you have shared logic

  const stats = [
    { title: "Total Tasks", count: totalTasks, icon: <FaList size={24} />, data: tasks },
    { title: "Completed", count: completedTasks.length, icon: <FaCheckCircle size={24} />, data: completedTasks },
    { title: "In Progress", count: inProgressTasks.length, icon: <FaClock size={24} />, data: inProgressTasks },
    { title: "Shared", count: sharedTasks.length, icon: <FaUsers size={24} />, data: sharedTasks },
  ];

  const cardColors = [
    "linear-gradient(135deg, #333333, #555555)", // dark grey gradient
    "linear-gradient(135deg, #4b4b4b, #6e6e6e)", // mid grey gradient
    "linear-gradient(135deg, #5e5e5e, #8e8e8e)", // lighter grey gradient
    "linear-gradient(135deg, #777777, #aaaaaa)", // light grey gradient
  ];

  return (
    <div className="container">
      <h3 className="mb-4">Overview</h3>

      <div className="row">
        {stats.map((stat, idx) => (
          <div className="col-md-3 mb-3" key={idx}>
            <div
              className="d-flex justify-content-between align-items-center p-3 rounded text-white"
              style={{
                background: cardColors[idx],
                borderRadius: "10px",
              }}
            >
              <div>
                <div>{stat.title}</div>
                <div>{stat.count}</div>
              </div>
              <div style={{ opacity: 0.5 }}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tasks listing below each section, OMIT Total Tasks */}
      {stats
        .filter(stat => stat.title !== "Total Tasks")
        .map((stat, idx) => (
          <div key={idx} className="mb-4">
            <h5 className="mt-3">{stat.title}</h5>
            <div className="overflow-auto" style={{ whiteSpace: 'nowrap' }}>
              {stat.data.length === 0 ? (
                <div className="text-muted">No tasks available</div>
              ) : (
                stat.data.map(task => (
                  <div
                    key={task._id}
                    className="d-inline-block"
                    style={{ minWidth: "250px", maxWidth: "300px" }}
                  >
                    <TaskCard
                      task={task}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Overview;
