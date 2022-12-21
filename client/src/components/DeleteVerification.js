const DeleteVerification = ({ name, deleteFunc, toggleBox }) => {
  return (
    <div className="delete-verification-section">
      <div className="overlay"></div>
      <div className="delete-verification-box">
        <h3>
          Are you sure you want to delete <span>{name}</span> ?
        </h3>
        <div className="yes-no-container">
          <button className="yes-btn" onClick={deleteFunc}>
            yes
          </button>
          <button className="no-btn" onClick={toggleBox}>
            no
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVerification;
