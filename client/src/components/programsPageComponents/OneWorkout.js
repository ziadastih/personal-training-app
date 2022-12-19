import { useState } from "react";
import { BiDownArrow } from "react-icons/bi";

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
const OneWorkout = ({ workout }) => {
  const [workoutState, setWorkoutState] = useState(false);

  return (
    <div className="workout-info-container">
      <div className="one-workout">
        {!workoutState && (
          <MdKeyboardArrowUp
            style={{ color: "var(--mediumGrey)", marginLeft: "20px" }}
          />
        )}
        {workoutState && (
          <MdKeyboardArrowDown
            style={{ color: "var(--mediumGrey)", marginLeft: "20px" }}
          />
        )}

        <p className="workout-name">{workout.name}</p>

        <span className="workout-length">
          {workout.exercises ? workout.exercises.length : "0"} ex
        </span>
      </div>
      <div className="exercises-container"></div>
    </div>
  );
};

export default OneWorkout;
