import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { PtContext } from "../context/PtContext";

const usePrograms = (pageNum = 0, collection) => {
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { url } = useContext(PtContext);

  // ==============remove program when deleting  ==============

  const removeProgram = (id) => {
    const programIndex = programs.findIndex((prog) => {
      return prog._id === id;
    });

    if (programIndex !== -1) {
      programs.splice(programIndex, 1);
    }
  };
  // ========use effect fetch data whenever pageNum change and set the hasNextPage depend on the last request

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${url}/api/v1/${collection}/?page=${pageNum}`,

          { withCredentials: true }
        );

        if (collection === "workoutProgram") {
          setPrograms((prev) => [...prev, ...data.workoutprograms]);

          setHasNextPage(Boolean(data.workoutprograms.length));
        } else if (collection === "diet") {
          setPrograms((prev) => [...prev, ...data.diets]);

          setHasNextPage(Boolean(data.diets.length));
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        console.log(error);
      }
    };

    fetchData();
  }, [pageNum]);

  return { isLoading, programs, hasNextPage, removeProgram };
};

export default usePrograms;
