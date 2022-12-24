import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEditNote } from "react-icons/md";
import {
  BsFillTrashFill,
  BsArrowsCollapse,
  BsArrowsExpand,
} from "react-icons/bs";
import OneWorkout from "./OneWorkout";
import useDays from "../../customHooks/DaysHook";
import DeleteVerification from "../DeleteVerification";
import axios from "axios";
import { PtContext } from "../../context/PtContext";

// ================component ============================
// ========set forwardref to give a ref for it

const OneProgram = React.forwardRef(({ program, removeProgram }, ref) => {
  const [overviewState, setOverviewState] = useState(false);
  const [verificationState, setVerificationState] = useState(false);
  const { url, dataLength, decreaseData } = useContext(PtContext);
  const { daysArr, currentDay } = useDays();
  const [workoutsArr, setWorkoutsArr] = useState([]);
  const navigate = useNavigate();

  // ===========toggle functions =================

  const toggleBox = () => {
    setVerificationState((prevState) => !prevState);
  };

  const toggleOverview = () => {
    setOverviewState((prevState) => !prevState);
  };
  // ================use effect to get the current workouts depend on the current day
  useEffect(() => {
    setWorkoutsArr(program.weeks[0].days[currentDay[0].index].workouts);
  }, [currentDay]);

  // ===========display the workouts =====================
  const displayWorkouts = workoutsArr.map((workout, index) => {
    return <OneWorkout key={index} workout={workout} />;
  });

  // =============delete program ==================
  const deleteProgram = async () => {
    try {
      const data = await axios.delete(
        `${url}/api/v1/workoutProgram/${program._id}`,
        {
          withCredentials: true,
        }
      );

      decreaseData(1);
      removeProgram(program._id);
      const updateData = await axios.patch(
        `${url}/api/v1/dataLength`,

        { workoutLength: dataLength[1].value - 1 },
        {
          withCredentials: true,
        }
      );

      toggleBox();
    } catch (error) {
      console.log(error.message);
    }
  };

  // ===========add border when overview is true ==================
  const programBorder = overviewState
    ? "program-container border-bottom"
    : "program-container";

  // ===========one program html =====================

  return (
    <div className={programBorder} ref={ref ?? ref}>
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
          <BsFillTrashFill onClick={toggleBox} />
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
      {/* ==================verification component =================== */}
      {verificationState && (
        <DeleteVerification
          name={program.name}
          deleteFunc={deleteProgram}
          toggleBox={toggleBox}
        />
      )}
    </div>
  );
});
export default OneProgram;
