const CenterSectionBtn = ({ name, func }) => {
  return (
    <div className="center-section-btn-container">
      <h3>create new {name}</h3>
      <button className="btn" onClick={func}>
        create
      </button>
    </div>
  );
};

export default CenterSectionBtn;
