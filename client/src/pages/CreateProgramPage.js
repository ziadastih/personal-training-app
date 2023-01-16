import PageHeader from "../components/PageHeader";
import useDays from "../customHooks/DaysHook";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import NameBox from "../components/createProgram/NameBox";
import exercisesList from "../fixedData,/exercisesList.json";
import ListContainer from "../components/ListContainer";
import useToggle from "../customHooks/toggleHook";
// ============Page Component  ================
const CreateProgramPage = () => {
  const [program, setProgram] = useState({
    name: "",
    weeks: [
      {
        days: [
          {
            workouts: [],
          },
          {
            workouts: [],
          },
          {
            workouts: [],
          },
          {
            workouts: [],
          },
          {
            workouts: [],
          },
          {
            workouts: [],
          },
          {
            workouts: [],
          },
        ],
      },
    ],
  });

  const [selectedExercises, setSelectedExercises] = useState([]);

  const addExercises = (exercise) => {
    if (exercise.selected === true) {
      setOriginalList((prevList) => {
        return prevList.map((ex) => {
          return ex.name === exercise.name ? { ...ex, selected: false } : ex;
        });
      });
    } else {
      setOriginalList((prevList) => {
        return prevList.map((ex) => {
          return ex.name === exercise.name ? { ...ex, selected: true } : ex;
        });
      });
    }
  };

  // ==============toggle functions ==================
  const { isToggled: programNameBoxState, toggleFunc: toggleProgramNameBox } =
    useToggle();

  const { isToggled: listContainerState, toggleFunc: toggleListContainer } =
    useToggle();

  //============= original exercises list state   =======
  const [originalList, setOriginalList] = useState(exercisesList);
  useEffect(() => {
    let selectedExercicesArr = originalList?.filter((ex) => {
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
    console.log(selectedExercicesArr);
  }, [originalList]);
  // =========program name state =========
  const [programName, setProgramName] = useState("...");
  // ===========assign program name sent by props tp submit btn  =========
  const assignProgramName = (name) => {
    setProgramName(name);
    toggleProgramNameBox();
  };

  // ====================days custom hook  =====================
  const { daysArr, currentDay } = useDays();

  // =================== render ==============

  return (
    <div className="all-pages-bg">
      {(programNameBoxState || listContainerState) && (
        <div className="overlay"></div>
      )}
      {/* =============page header ========= */}
      <PageHeader
        name={programName}
        icon={<AiOutlineEdit onClick={toggleProgramNameBox} />}
      />

      {/* =========days container============ */}
      <div className="days-container">{daysArr}</div>

      {/* ==============create btns ================= */}
      <div className="create-btns">
        <button className="full-btn" onClick={toggleListContainer}>
          create workout
        </button>
        <button className="outline-btn">set as rest day</button>
        {/* <button class="outline-btn">submit program</button> */}
      </div>

      {/* ================ program name box ================ */}
      <NameBox
        name="program name"
        boxState={programNameBoxState}
        toggleBox={toggleProgramNameBox}
        assignName={assignProgramName}
      />

      {/* =============original exercises list container ============= */}
      <ListContainer
        name="exercises"
        originalList={originalList}
        toggleList={toggleListContainer}
        listState={listContainerState}
        addExercises={addExercises}
      />
    </div>
  );
};

export default CreateProgramPage;
