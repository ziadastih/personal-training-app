import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEditNote } from "react-icons/md";
import {
  BsFillTrashFill,
  BsArrowsCollapse,
  BsArrowsExpand,
} from "react-icons/bs";
import OneWorkout from "./OneWorkout";
import useDays from "../../customHooks/DaysHook";

const OneProgram = ({ program }) => {
  const [overviewState, setOverviewState] = useState(false);
  const { daysArr, currentDay } = useDays();
  const [workoutsArr, setWorkoutsArr] = useState([]);
  const navigate = useNavigate();

  const toggleOverview = () => {
    setOverviewState((prevState) => !prevState);
  };

  useEffect(() => {
    setWorkoutsArr(program.weeks[0].days[currentDay[0].index].workouts);
  }, [currentDay]);

  const displayWorkouts = workoutsArr.map((workout, index) => {
    return <OneWorkout key={index} workout={workout} />;
  });

  return (
    <div
      className={
        overviewState ? "program-container border-bottom" : "program-container"
      }
    >
      <div className="program">
        {!overviewState && (
          <BsArrowsExpand
            style={{ marginLeft: "30px", color: "var(--white)", opacity: 0.5 }}
            onClick={toggleOverview}
          />
        )}
        {overviewState && (
          <BsArrowsCollapse
            style={{ marginLeft: "30px", color: "var(--white)", opacity: 0.5 }}
            onClick={toggleOverview}
          />
        )}

        <p>{program.name}</p>
        <div
          className="tools"
          style={{
            color: "var(--blue)",
            marginRight: "30px",
          }}
        >
          <MdOutlineEditNote
            style={{ fontSize: "25px" }}
            onClick={() => navigate(`/program/${program._id}`)}
          />
          <BsFillTrashFill />
        </div>
      </div>

      {/* ======================overview =================== */}

      {overviewState && (
        <div className="overview-container">
          <div className="date-stats">
            <p className="created-at">
              created at: {program.createdAt.slice(0, 10)}
            </p>
            <p className="updated-at">
              updated at: {program.updatedAt.slice(0, 10)}
            </p>
          </div>
          <div className="days-container">{daysArr}</div>
          <div className="created-workouts">
            {displayWorkouts.length === 0 ? (
              <h2>No workouts available</h2>
            ) : (
              displayWorkouts
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default OneProgram;
