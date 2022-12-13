import { createContext, useState } from "react";

const PtContext = createContext();

const PtContextProvider = (props) => {
  const [user, setUser] = useState({
    role: "",
    _id: "",
  });

  return (
    <PtContext.Provider value={{ user }}>{props.children}</PtContext.Provider>
  );
};

export { PtContext, PtContextProvider };
