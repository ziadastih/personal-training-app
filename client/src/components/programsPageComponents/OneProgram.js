import React, { useEffect, useState, useContext } from "react";
import { BsArrowsCollapse, BsArrowsExpand } from "react-icons/bs";
import OneWorkout from "./OneWorkout";
import useDays from "../../customHooks/DaysHook";
import DeleteVerification from "../DeleteVerification";
import { deleteProgram } from "../../api/workoutProgramsApi";
import clientsApi from "../../api/clientsApi";
import { useMutation, useQueryClient } from "react-query";
import useTools from "../../customHooks/toolsHook";
import useToggle from "../../customHooks/toggleHook";
import { PtContext } from "../../context/PtContext";
import { BiLoaderCircle } from "react-icons/bi";
// ================OneProgram Component============================

const OneProgram = React.forwardRef(({ program }, ref) => {
  // =======toggle  hooks ======================
  const { toggleFunc, isToggled } = useToggle();
  const { toggleFunc: toggleOverview, isToggled: overviewState } = useToggle();

  // =========tools =============
  const { tools } = useTools("editProgram", program._id, toggleFunc);
  // ============days hook  ==============

  const { daysArr, currentDay } = useDays();

  // =======workoutarr state =========
  const [workoutsArr, setWorkoutsArr] = useState([]);

  const { decreaseData, dataLength } = useContext(PtContext);

  const queryClient = useQueryClient();

  //  ============delete program mutation on success update datalength =================

  const deleteProgramMutation = useMutation(deleteProgram, {
    onSuccess: async () => {
      queryClient.invalidateQueries("workoutProgramsArr");
      queryClient.invalidateQueries("searchedPrograms");
      await clientsApi.patch("/dataLength", {
        workoutLength: dataLength[1].value - 1,
      });

      decreaseData(1);
      toggleFunc();
    },
  });

  const deleteFunc = async () => {
    deleteProgramMutation.mutate(program._id);
  };

  // ================use effect to get the current workouts depend on the current day
  useEffect(() => {
    setWorkoutsArr(program.weeks[0].days[currentDay[0].index].workouts);
  }, [currentDay]);

  // ===========display the workouts =====================
  const displayWorkouts = workoutsArr.map((workout, index) => {
    return <OneWorkout key={index} workout={workout} />;
  });

  // ===========add border when overview is true ==================
  const programBorder = overviewState
    ? "program-container border-bottom"
    : "program-container";

  // ===============arrow styles ==========
  const arrowStyles = {
    marginLeft: "30px",
    color: "var(--white)",
    opacity: 0.5,
  };
  // =========== render programs with ref to the last one =====================

  return (
    <div className={programBorder} ref={ref ?? ref}>
      {deleteProgramMutation.isLoading && <BiLoaderCircle className="load" />}
      <div className="program">
        {/* ============arrows ============ */}
        {!overviewState && (
          <BsArrowsExpand style={arrowStyles} onClick={toggleOverview} />
        )}
        {overviewState && (
          <BsArrowsCollapse style={arrowStyles} onClick={toggleOverview} />
        )}
        {/* ==================== name and tools  =========== */}
        <p>{program.name}</p>
        {tools}
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
      {isToggled && (
        <DeleteVerification
          name={program.name}
          toggleBox={toggleFunc}
          deleteFunc={deleteFunc}
        />
      )}
    </div>
  );
});
export default OneProgram;
