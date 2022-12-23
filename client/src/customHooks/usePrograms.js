import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { PtContext } from "../context/PtContext";

const usePrograms = (pageNum = 0) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { url } = useContext(PtContext);
  useEffect(() => {
    setIsLoading(true);

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${url}/api/v1/workoutProgram/?page=${pageNum}`,

          { withCredentials: true }
        );
        setResults((prev) => [...prev, ...data.workoutprograms]);

        setHasNextPage(Boolean(data.workoutprograms.length));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (signal.aborted) return;
        console.log(error);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [pageNum]);

  return { isLoading, results, hasNextPage };
};

export default usePrograms;
