import { useState } from "react";
import useToggle from "./toggleHook";
const useProgramName = () => {
  const [programName, setProgramName] = useState("...");
  const { isToggled, toggleFunc } = useToggle();
  // ===========assign program name sent by props tp submit btn  =========
  const assignProgramName = (name) => {
    setProgramName(name);
    toggleFunc();
  };

  return { isToggled, toggleFunc, assignProgramName, programName };
};

export default useProgramName;
