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

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard"); // default view

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = "Todo | Dashboard";
    fetchTasks();
  }, []);

  const handleAddTask = () => {
    setCurrentTask(null); // clear previous edit data
    const modal = new bootstrap.Modal(document.getElementById("addTaskModal"));
    modal.show();
  };

  const handleSaveTask = async (task) => {
    try {
      if (currentTask) {
        // Edit mode: update existing task
        await axiosInstance.put(`/tasks/${currentTask._id}`, task);
      } else {
        // Add mode: create new task
        await axiosInstance.post("/tasks", task);
      }
      fetchTasks();
      bootstrap.Modal.getInstance(
        document.getElementById("addTaskModal")
      ).hide();
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
      await axiosInstance.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
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
                />
              )}

              {currentView === "overview" && (
                <Overview
                  tasks={tasks}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
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
      </div>
    </div>
  );
};

export default Dashboard;
