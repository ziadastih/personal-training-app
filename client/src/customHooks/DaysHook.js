import OneDay from "../components/OneDay";
import { useState } from "react";

const useDays = () => {
  const [day, setDay] = useState([
    { name: "mon", isSelected: true, index: 0 },
    { name: "tue", isSelected: false, index: 1 },
    { name: "wed", isSelected: false, index: 2 },
    { name: "thu", isSelected: false, index: 3 },
    { name: "fri", isSelected: false, index: 4 },
    { name: "sat", isSelected: false, index: 5 },
    { name: "sun", isSelected: false, index: 6 },
  ]);
  let currentDay = day.filter((day) => {
    return day.isSelected === true;
  });

  const updateDay = (e) => {
    let name = e.target.textContent;
    setDay((prevDay) => {
      return prevDay.map((day) => {
        return day.name === name
          ? { ...day, isSelected: true }
          : { ...day, isSelected: false };
      });
    });
  };

  const daysArr = day.map((day) => {
    return <OneDay key={day.index} day={day} func={updateDay} />;
  });
  return { daysArr, currentDay };
};

export default useDays;
