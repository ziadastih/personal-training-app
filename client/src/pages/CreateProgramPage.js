import PageHeader from "../components/PageHeader";
import useDays from "../customHooks/DaysHook";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import NameBox from "../components/createProgram/NameBox";
import exercisesList from "../fixedData,/exercisesList.json";
import ListContainer from "../components/ListContainer";
import useToggle from "../customHooks/toggleHook";
import useProgramName from "../customHooks/nameHook";
import useAddToList from "../customHooks/addToListHook";
import useSelectedExercises from "../customHooks/selectedExercicesHook";
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

  // ==program name hook

  const {
    programName,
    assignProgramName,
    isToggled: programNameBoxState,
    toggleFunc: toggleProgramNameBox,
  } = useProgramName();

  // ======add to list hook
  const { addItem, originalList } = useAddToList(exercisesList);

  // =======selected Exercises hook

  const { selectedExercises } = useSelectedExercises(originalList);

  const { isToggled: listContainerState, toggleFunc: toggleListContainer } =
    useToggle();

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
        addExercises={addItem}
      />
    </div>
  );
};

export default CreateProgramPage;
