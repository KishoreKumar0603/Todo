import React from "react";
import { MdDashboard } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { RiUserShared2Fill } from "react-icons/ri";
import { MdDateRange } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { CiFlag1 } from "react-icons/ci";
import { ImUser } from "react-icons/im";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ onSelectView }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column p-3 text-white vh-100 sidebar-fixed box-fix">
      <h4 className="mb-4 text-center">ToDo</h4>

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <button
            className="nav-link text-white w-100"
            onClick={() => onSelectView("dashboard")}
          >
            <MdDashboard className="text-white me-2"/>Dashboard
          </button>
        </li>
        <li>
          <button
            className="nav-link text-white w-100"
            onClick={() => onSelectView("overview")}
          >
            <GrOverview className="text-white me-2"/>Overview
          </button>
        </li>
        <li>
          <button className="nav-link text-white w-100"
            onClick={()=>onSelectView("sharedview")}
          >
            <RiUserShared2Fill  className="text-white me-2"/>Shared Tasks
          </button>
        </li>
      </ul>

      <hr />

      <h6 className="text-muted">Quick Filters</h6>
      <ul className="nav nav-pills flex-column">
        <li>
          <button
            className="nav-link text-white w-100"
            onClick={() => onSelectView("dueToday")}
          >
           <MdDateRange className="text-white me-2"/> Due Today
          </button>
        </li>
        <li>
          <button
            className="nav-link text-white w-100"
            onClick={() => onSelectView("overdue")}
          >
            <CgDanger className="text-white me-2"/>Overdue
          </button>
        </li>
        <li>
          <button
            className="nav-link text-white w-100"
            onClick={() => onSelectView("highPriority")}
          >
            <CiFlag1 className="text-white me-2"/>High Priority
          </button>
        </li>
      </ul>

      <div className="mt-auto text-center d-flex justify-content-center position-relative">
        <button
          className="btn btn-outline-light btn-sm mt-3 px-3 d-flex justify-content-center align-items-center"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <ImUser className="me-2" /> Profile
        </button>

        {showProfileMenu && (
          <div
            className="position-absolute mb-100 rounded shadow p-2"
            style={{ bottom: "50px" }}
          >
            <button
              className="btn btn-outline-light btn-sm mt-3 px-3 d-flex justify-content-center align-items-center"
              onClick={handleLogout}
            >
             <IoIosLogOut className="me-2"/> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
