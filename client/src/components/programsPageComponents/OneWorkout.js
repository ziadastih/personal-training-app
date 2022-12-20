import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import OneExercice from "../OneExercise";

const OneWorkout = ({ workout }) => {
  const [workoutState, setWorkoutState] = useState(false);

  const toggleExercises = () => {
    setWorkoutState((prevState) => !prevState);
  };

  let exercise = workout.exercises;

  let displayExercise;
  if (exercise) {
    displayExercise = exercise.map((exercise, index) => {
      return <OneExercice key={index} exercise={exercise} />;
    });
  }
  return (
    <div className="workout-info-container">
      <div className="one-workout">
        {!workoutState && (
          <MdKeyboardArrowUp
            style={{ color: "var(--mediumGrey)", marginLeft: "20px" }}
            onClick={toggleExercises}
          />
        )}
        {workoutState && (
          <MdKeyboardArrowDown
            style={{ color: "var(--mediumGrey)", marginLeft: "20px" }}
            onClick={toggleExercises}
          />
        )}

        <p className="workout-name">{workout.name}</p>

        <span className="workout-length">
          {workout.exercises ? workout.exercises.length : "0"} ex
        </span>
      </div>

      {workoutState && (
        <div className="exercises-container">{displayExercise}</div>
      )}
    </div>
  );
};

export default OneWorkout;
