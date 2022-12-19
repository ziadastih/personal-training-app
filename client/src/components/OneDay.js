const OneDay = ({ day, func }) => {
  return (
    <p className={day.isSelected ? "day chosen-day" : "day"} onClick={func}>
      {day.name}
    </p>
  );
};

export default OneDay;
