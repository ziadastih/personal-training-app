import { createContext, useState, useEffect } from "react";

const PtContext = createContext();

const PtContextProvider = (props) => {
  const url = "http://192.168.1.195:5000";
  // ============= user state and dataLength state  =======================

  const [user, setUser] = useState({
    role: "",
    id: "",
    firstName: "",
    lastName: "",
  });
  const [dataLength, setDataLength] = useState([
    { value: 0 },
    {
      value: 0,
    },
    {
      value: 0,
    },
  ]);

  // ====================reset and update user functions===========

  const resetUser = () => {
    setUser({ role: "", id: "", firstName: "", lastName: "" });
  };
  const updateUser = (role, id, firstName, lastName) => {
    return setUser({ role, id, firstName, lastName });
  };

  // ===============set user in local storage so we make sure we dont lose it when we want to refresh and we update the local storage whenever user change

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));

    if (localStorageUser) {
      updateUser(
        localStorageUser.role,
        localStorageUser.id,
        localStorageUser.firstName,
        localStorageUser.lastName
      );
    }
  }, []);

  useEffect(() => {
    if (user.id.length > 0) {
      return localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // ======================update local storage whenever datalength change , and in case we refresh we keep the same data

  useEffect(() => {
    const dataInLocalS = JSON.parse(localStorage.getItem("dataLength"));
    if (dataInLocalS) {
      setOriginalData(
        dataInLocalS[0].value,
        dataInLocalS[1].value,
        dataInLocalS[2].value
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dataLength", JSON.stringify(dataLength));
  }, [dataLength]);

  // ===============set the datalength state when we fetch it first in coach homepage//

  const setOriginalData = (clientLength, workoutLength, dietLength) => {
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

  // ===================decrease anad increase  reset dataLength =================
  const decreaseData = (i) => {
    return setDataLength((prevState) => {
      return prevState.map((obj, index) => {
        return index === i ? { value: obj.value - 1 } : obj;
      });
    });
  };

  const increaseData = (i) => {
    return setDataLength((prevState) => {
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
