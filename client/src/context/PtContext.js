import { createContext, useState } from "react";

const PtContext = createContext();

const PtContextProvider = (props) => {
  const [user, setUser] = useState({
    role: "",
    _id: "",
  });

  const updateUser = (role, id) => {
    setUser({ role, id });
  };

  return (
    <PtContext.Provider value={{ user, updateUser }}>
      {props.children}
    </PtContext.Provider>
  );
};

export { PtContext, PtContextProvider };
