import { useState, useEffect } from "react";

const useSelectedExercises = (value) => {
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    let selectedExercicesArr = value?.filter((ex) => {
      return ex.selected === true;
    });
    selectedExercicesArr = selectedExercicesArr.map((ex) => {
      return {
        name: ex.name,
        img: ex.img,
        video: ex.video,
        note: ex.note || "",
        rep: ex.rep || 0,
        set: ex.set || 0,
        tempo: ex.tempo || 0,
        chain: ex.chain || false,
        type: ex.type || "",
        rest: ex.rest || "",
      };
    });
    setSelectedExercises(selectedExercicesArr);
  }, [value]);

  return { selectedExercises };
};

export default useSelectedExercises;
