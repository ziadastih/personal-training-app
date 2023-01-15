import useToggle from "../../customHooks/toggleHook";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import OneExercice from "./OneExercise";

const OneWorkout = ({ workout }) => {
  // ===========toggle hook to toggle exercises overview ============
  const { toggleFunc, isToggled } = useToggle();

  // ===========css ============
  const arrowStyles = {
    color: "var(--mediumGrey)",
    marginLeft: "20px",
  };

  // ==========exercises ===============
  let exercise = workout.exercises;

  let displayExercise = exercise?.map((exercise, index) => {
    return <OneExercice key={index} exercise={exercise} />;
  });

  return (
    <div className="workout-info-container">
      <div className="one-workout">
        {/* ==========arrows ================= */}
        {!isToggled && (
          <MdKeyboardArrowUp style={arrowStyles} onClick={toggleFunc} />
        )}
        {isToggled && (
          <MdKeyboardArrowDown style={arrowStyles} onClick={toggleFunc} />
        )}
        {/* =============name and length  =============== */}
        <p className="workout-name">{workout.name}</p>

        <span className="workout-length">
          {workout.exercises ? workout.exercises.length : "0"} ex
        </span>
      </div>
      {/* =============exercises container ============== */}
      {isToggled && (
        <div className="exercises-container">{displayExercise}</div>
      )}
    </div>
  );
};

export default OneWorkout;
