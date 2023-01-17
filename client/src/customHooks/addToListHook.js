import { useState } from "react";

const useAddToList = (value) => {
  const [originalList, setOriginalList] = useState(value);

  const addItem = (item) => {
    if (item.selected === true) {
      setOriginalList((prevList) => {
        return prevList.map((ex) => {
          return ex.name === item.name ? { ...ex, selected: false } : ex;
        });
      });
    } else {
      setOriginalList((prevList) => {
        return prevList.map((ex) => {
          return ex.name === item.name ? { ...ex, selected: true } : ex;
        });
      });
    }
  };

  return { addItem, originalList };
};

export default useAddToList;
