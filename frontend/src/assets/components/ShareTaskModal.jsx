import React, { useState } from "react";
import axiosInstance from "../../Contexts/axiosInstance";

const ShareTaskModal = ({ taskId, onClose }) => {
  const [email, setEmail] = useState("");

  const handleShare = async () => {
  try {
    const token = localStorage.getItem("token");

    // Search user by email first
    const res = await axiosInstance.get(`/users/email/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = res.data;

    if (!user || !user._id) {
      alert("User not found");
      return;
    }

    // Share the task
    await axiosInstance.put(
      `/tasks/${taskId}/share`,
      { userId: user._id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert("Task shared successfully");
    onClose();
  } catch (err) {
    console.error(err);

    if (err.response && err.response.status === 404) {
      alert("User not found");
    } else {
      alert("Error sharing task. Please try again.");
    }
  }
};


  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Share Task</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Enter user's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleShare}
              disabled={!email}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareTaskModal;
