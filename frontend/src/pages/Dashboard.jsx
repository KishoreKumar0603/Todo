import React, { useEffect, useState } from "react";
import axiosInstance from "../Contexts/axiosInstance.js";
import Sidebar from "../assets/components/Sidebar";
import Topbar from "../assets/components/Topbar";
import TaskGrid from "../assets/components/TaskGrid";
import AddTaskModal from "../assets/components/AddTaskModal";
import CalendarWidget from "../assets/components/CalendarWidget";
import Overview from "./Overview.jsx";
import DueTodayComponent from "./DueTodayComponent.jsx";
import HighPriorityComponent from "./HighPriorityComponent.jsx";
import OverdueComponent from "./OverdueComponent.jsx";
import ShareTaskModal from "../assets/components/ShareTaskModal.jsx";
import SharedTask from "./SharedTask.jsx";

import {jwtDecode} from "jwt-decode";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard"); // default view
  const [shareTaskId, setShareTaskId] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = "Todo | Dashboard";
    const token = localStorage.getItem("token");
    if(token){
      const decoded = jwtDecode(token);
      setLoggedInUserId(decoded.id);
    }
    fetchTasks();
  }, []);

  const handleAddTask = () => {
    setCurrentTask(null);
    const modal = new bootstrap.Modal(document.getElementById("addTaskModal"));
    modal.show();
  };

  const handleSaveTask = async (task) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (currentTask) {
      // Edit mode: update existing task
      await axiosInstance.put(`/tasks/${currentTask._id}`, task, config);
    } else {
      // Add mode: create new task
      await axiosInstance.post("/tasks", task, config);
    }

    fetchTasks();
    bootstrap.Modal.getInstance(document.getElementById("addTaskModal")).hide();
  } catch (error) {
    console.error(error);
  }
};


  const handleEditTask = (task) => {
    setCurrentTask(task); // Prefill with task data for editing
    const modal = new bootstrap.Modal(document.getElementById("addTaskModal"));
    modal.show();
  };

  const handleDeleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axiosInstance.delete(`/tasks/${taskId}`, config);
    fetchTasks();
  } catch (error) {
    console.error(error);
  }
};


  const handleShareTask = (task) => {
    setShareTaskId(task._id);
  };

  const handleCloseShareModal = () => {
    setShareTaskId(null);
    fetchTasks();
  };

  return (
    <div className="d-flex">
      <Sidebar onSelectView={setCurrentView} />
      <div className="flex-grow-1">
        <Topbar onAddTask={handleAddTask} />
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-lg-9">
              {currentView === "dashboard" && (
                <TaskGrid
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                  onShare={handleShareTask}
                  loggedInUserId={loggedInUserId}
                />
              )}

              {currentView === "overview" && (
                <Overview
                  tasks={tasks}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                />
              )}
              {currentView === "sharedview" && (
                <SharedTask
                  tasks={tasks}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  loggedInUserId={loggedInUserId}
                />
              )}

              {currentView === "dueToday" && (
                <DueTodayComponent
                  tasks={tasks.filter((task) => {
                    const today = new Date().toISOString().split("T")[0];
                    return task.dueDate === today;
                  })}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                />
              )}

              {currentView === "overdue" && (
                <OverdueComponent
                  tasks={tasks.filter((task) => {
                    const today = new Date();
                    return new Date(task.dueDate) < today;
                  })}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                />
              )}

              {currentView === "highPriority" && (
                <HighPriorityComponent
                  tasks={tasks}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                />
              )}
            </div>

            <div className="col-lg-3">
              <CalendarWidget />
            </div>
          </div>
        </div>

        <AddTaskModal onSave={handleSaveTask} />

        {shareTaskId && (
          <ShareTaskModal
            taskId={shareTaskId}
            onClose={handleCloseShareModal}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
