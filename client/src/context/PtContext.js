import { createContext } from "react";
import useDataLength from "../customHooks/dataLengthHook";
import useUser from "../customHooks/userHook";
const PtContext = createContext();

const PtContextProvider = (props) => {
  // ============= user  and dataLength hooks =======================

  const { user, resetUser, updateUser } = useUser();

  const {
    dataLength,
    resetDataLength,
    submitFetchedDataLength,
    increaseDataLength,
    decreaseDataLength,
  } = useDataLength();

  return (
    <PtContext.Provider
      value={{
        user,
        updateUser,
        resetUser,
        dataLength,
        resetDataLength,
        submitFetchedDataLength,
        decreaseDataLength,
        increaseDataLength,
      }}
    >
      {props.children}
    </PtContext.Provider>
  );
};

export { PtContext, PtContextProvider };
