import { createContext, useState } from "react";

const PtContext = createContext();

const PtContextProvider = (props) => {
  const url = "http://192.168.1.195:5000";
  // =============user related  =======================

  const [user, setUser] = useState({
    role: "",
    id: "",
    firstName: "",
    lastName: "",
  });

  const resetUser = () => {
    setUser({ role: "", id: "", firstName: "", lastName: "" });
  };
  const updateUser = (role, id, firstName, lastName) => {
    return setUser({ role, id, firstName, lastName });
  };

  // ======================dataLength ======================

  const [dataLength, setDataLength] = useState({
    wLength: 0,
    dLength: 0,
    cLength: 0,
  });

  const setOriginalData = (workoutLength, dietLength, clientLength) => {
    setDataLength({
      wLength: workoutLength >= 10 ? workoutLength : `0${workoutLength}`,
      dLength: dietLength >= 10 ? dietLength : `0${dietLength}`,
      cLength: clientLength >= 10 ? clientLength : `0${clientLength}`,
    });
  };

  const resetData = () => {
    setDataLength({ wLength: 0, dLength: 0, cLength: 0 });
  };

  return (
    <PtContext.Provider
      value={{
        user,
        updateUser,
        url,
        resetUser,
        setOriginalData,
        dataLength,
        resetData,
      }}
    >
      {props.children}
    </PtContext.Provider>
  );
};

export { PtContext, PtContextProvider };
