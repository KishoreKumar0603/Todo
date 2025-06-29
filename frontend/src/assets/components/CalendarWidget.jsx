import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Contexts/axiosInstance';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const fetchTasksForDate = async (date) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const formattedDate = date.toISOString().split('T')[0];
    const res = await axiosInstance.get(`/tasks?date=${formattedDate}`, config);
    setTasks(res.data);
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    fetchTasksForDate(selectedDate);
  }, [selectedDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();

    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const totalCells = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;
    const daysArray = [];

    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - firstDayOfWeek + 1;
      const isValid = dayNum > 0 && dayNum <= daysInMonth;

      const isToday =
        dayNum === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const isSelected =
        dayNum === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear();

      daysArray.push(
        <div
          key={i}
          className="col text-center p-0 m-0"
          onClick={() => isValid && setSelectedDate(new Date(year, month, dayNum))}
          style={{ cursor: isValid ? 'pointer' : 'default' }}
        >
          {isValid && (
            <div
              className={`d-inline-block m-1 ${
                isSelected ? 'bg-primary text-white' : isToday ? 'bg-light text-dark' : ''
              } rounded-circle`}
              style={{
                width: '32px',
                height: '32px',
                lineHeight: '32px'
              }}
            >
              {dayNum}
            </div>
          )}
        </div>
      );
    }

    return daysArray;
  };

  const getPriorityColor = (priority) => {
    if (priority === 'high') return 'bg-danger';
    if (priority === 'medium') return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="calendar-widget card shadow-sm p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0 fw-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h6>
        <div>
          <button className="btn btn-sm btn-outline-secondary me-1" onClick={handlePrevMonth}>
            {/* <i className="bi bi-chevron-left"></i> */}
            <IoIosArrowBack />
          </button>
          <button className="btn btn-sm btn-outline-secondary" onClick={handleNextMonth}>
            {/* <i className="bi bi-chevron-right"></i> */}
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="row g-0 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="col text-center">
              <small className="text-muted fw-semibold">{day}</small>
            </div>
          ))}
        </div>
        <div className="row g-0 flex-wrap">
          {renderCalendarDays()}
        </div>
      </div>

      <div className="mt-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <small className="text-muted">Tasks on {selectedDate.toDateString()}</small>
          <span className="badge bg-primary">{tasks.length}</span>
        </div>
        <div className="small" style={{ maxHeight: '150px', overflowY: 'auto' }}>
          {tasks.length === 0 && <div className="text-muted">No tasks</div>}
          {tasks.map((task) => (
            <div className="d-flex align-items-center mb-1" key={task._id}>
              <div
                className={`${getPriorityColor(task.priority)} rounded-circle me-2`}
                style={{ width: '8px', height: '8px' }}
              ></div>
              <span>{task.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
