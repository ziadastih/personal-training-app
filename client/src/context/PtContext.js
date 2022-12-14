import { createContext, useState } from "react";

const PtContext = createContext();

const PtContextProvider = (props) => {
  const url = "http://192.168.1.195:5000";
  const [user, setUser] = useState({
    role: "",
    _id: "",
  });

  const updateUser = (role, id) => {
    setUser({ role, id });
  };

  return (
    <PtContext.Provider value={{ user, updateUser, url }}>
      {props.children}
    </PtContext.Provider>
  );
};

export { PtContext, PtContextProvider };
