import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column p-3 bg-dark text-white vh-100" style={{ width: "300px" }}>
      <h4 className="mb-4 text-center">🗂️ TikTik</h4>

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/" className="nav-link text-white" end>
            🏠 Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/overview" className="nav-link text-white">
            📊 Overview
          </NavLink>
        </li>
        <li>
          <NavLink to="/shared" className="nav-link text-white">
            👥 Shared Tasks
          </NavLink>
        </li>
      </ul>

      <hr />

      <h6 className="text-muted">Quick Filters</h6>
      <ul className="nav flex-column">
        <li>
          <NavLink to="/filter/due-today" className="nav-link text-white">
            📅 Due Today
          </NavLink>
        </li>
        <li>
          <NavLink to="/filter/overdue" className="nav-link text-white">
            ⏰ Overdue
          </NavLink>
        </li>
        <li>
          <NavLink to="/filter/high-priority" className="nav-link text-white">
            ⚡ High Priority
          </NavLink>
        </li>
      </ul>

      <div className="mt-auto text-center">
        <button className="btn btn-outline-light btn-sm mt-3">👤 Profile</button>
      </div>
    </div>
  );
};

export default Sidebar;
