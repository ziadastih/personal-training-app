import { useEffect, useState } from "react";

const useDataLength = () => {
  const [dataLength, setDataLength] = useState([
    { value: 0 },
    {
      value: 0,
    },
    {
      value: 0,
    },
  ]);

  // ======================update local storage whenever datalength change , and in case we refresh we keep the same data

  useEffect(() => {
    const dataInLocalS = JSON.parse(localStorage.getItem("dataLength"));
    if (dataInLocalS) {
      submitFetchedDataLength(
        dataInLocalS[0].value,
        dataInLocalS[1].value,
        dataInLocalS[2].value
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dataLength", JSON.stringify(dataLength));
  }, [dataLength]);

  // ===============set the datalength state

  const submitFetchedDataLength = (clientLength, workoutLength, dietLength) => {
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

  // ===================decrease and increase  reset dataLength =================
  const decreaseDataLength = (i) => {
    return setDataLength((prevState) => {
      return prevState.map((obj, index) => {
        return index === i ? { value: obj.value - 1 } : obj;
      });
    });
  };

  const increaseDataLength = (i) => {
    return setDataLength((prevState) => {
      return prevState.map((obj, index) => {
        return index === i ? { value: obj.value + 1 } : obj;
      });
    });
  };

  const resetDataLength = () => {
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

  return {
    dataLength,
    submitFetchedDataLength,
    decreaseDataLength,
    increaseDataLength,
    resetDataLength,
  };
};

export default useDataLength;
