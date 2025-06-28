import React from "react";

const Topbar = ({ onAddTask }) => {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
      <h4 className="m-0">My Todo</h4>
      <button className="btn btn-primary" onClick={onAddTask}>
        + Add New
      </button>
    </div>
  );
};

export default Topbar;
