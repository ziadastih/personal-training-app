const NavigationBox = ({ icon, name, func }) => {
  const styles = {
    fontSize: "30px",
    color: "var(--blue)",
    marginBottom: "20px",
  };

  return (
    <div className="access-box" onClick={func}>
      <div style={styles}>{icon}</div>
      <p>{name}</p>
    </div>
  );
};

export default NavigationBox;
