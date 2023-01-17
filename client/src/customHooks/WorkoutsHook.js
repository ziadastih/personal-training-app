import { useEffect, useState } from "react";
import OneWorkout from "../components/programsPageComponents/OneWorkout";

const useWorkouts = (program, currentDay) => {
  const [workoutsArr, setWorkoutsArr] = useState([]);

  // ================use effect to get the current workouts depend on the current day
  useEffect(() => {
    setWorkoutsArr(program.weeks[0].days[currentDay[0].index].workouts);
  }, [currentDay]);

  // ===========display the workouts =====================
  const displayWorkouts = workoutsArr?.map((workout, index) => {
    return <OneWorkout key={index} workout={workout} />;
  });

  return { displayWorkouts };
};

export default useWorkouts;
