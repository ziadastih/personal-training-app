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

  const [dataLength, setDataLength] = useState([
    { value: 0 },
    {
      value: 0,
    },
    {
      value: 0,
    },
  ]);

  const setOriginalData = (workoutLength, dietLength, clientLength) => {
    setDataLength([
      {
        value: clientLength,
      },
      {
        value: workoutLength,
      },
      {
        value: dietLength,
      },
    ]);
  };

  const decreaseData = (i) => {
    setDataLength((prevState) => {
      return prevState.map((obj, index) => {
        return index === i ? { value: obj.value - 1 } : obj;
      });
    });
  };
  const increaseData = (i) => {
    setDataLength((prevState) => {
      return prevState.map((obj, index) => {
        return index === i ? { value: obj.value + 1 } : obj;
      });
    });
  };

  const resetData = () => {
    setDataLength([
      { value: 0 },
      {
        value: 0,
      },
      {
        value: 0,
      },
    ]);
  };

  // ==================end of datalength ===============

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
        decreaseData,
        increaseData,
      }}
    >
      {props.children}
    </PtContext.Provider>
  );
};

export { PtContext, PtContextProvider };
