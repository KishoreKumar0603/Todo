const Topbar = ({ onAddTask }) => {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
      <h4 className="m-0 text-prim fw-bold">My Todo</h4>
      <button className="btn box-fix btn-for-add" onClick={onAddTask}>
        + Add New
      </button>
    </div>
  );
};
export default Topbar;
