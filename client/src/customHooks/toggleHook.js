import { useState } from "react";

const useToggle = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleFunc = () => {
    setIsToggled((prev) => !prev);
  };

  return { isToggled, toggleFunc };
};

export default useToggle;
