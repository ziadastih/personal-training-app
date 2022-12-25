import PageHeader from "../components/PageHeader";
import useDays from "../customHooks/DaysHook";
import { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import NameBox from "../components/createProgram/NameBox";

// ============Page Component  ================
const CreateProgramPage = () => {
  const [formsState, setFormsState] = useState([
    {
      name: "program name",
      toggle: true,
    },
    {
      name: "workout name",
      toggle: false,
    },
  ]);
  const [programName, setProgramName] = useState("");

  // ===========assign program name sent by props tp submit btn  =========
  const assignProgramName = (name) => {
    setProgramName(name);
    setFormsState((prev) => {
      return [...prev, (prev[0].toggle = false)];
    });
  };

  // ============open and close form function will be sent by props ==========

  const toggleForm = (e) => {
    let name = e.target.dataset.id;

    setFormsState((prevState) => {
      return prevState.map((form) => {
        return form.name === name ? { ...form, toggle: !form.toggle } : form;
      });
    });
  };

  // ====================days custom hook  =====================
  const { daysArr, currentDay } = useDays();

  return (
    <div className="all-pages-bg">
      <PageHeader
        name={programName}
        icon={<AiOutlineEdit data-id="program name" onClick={toggleForm} />}
      />

      <div className="days-container">{daysArr}</div>

      {/* ==============create btns ================= */}
      <div className="create-btns">
        <button className="full-btn">create workout</button>
        <button className="outline-btn">set as rest day</button>
        {/* <button class="outline-btn">submit program</button> */}
      </div>
      {/* ================ program name box ================ */}
      <NameBox
        name={formsState[0].name}
        formState={formsState[0].toggle}
        toggleForm={toggleForm}
        assignName={assignProgramName}
      />
    </div>
  );
};

export default CreateProgramPage;
