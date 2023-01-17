import { useState, useEffect } from "react";

const useUser = () => {
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

  return { user, updateUser, resetUser };
};
export default useUser;
