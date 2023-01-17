import { useEffect, useContext } from "react";
import { PtContext } from "../context/PtContext";
import axiosCall from "../api/clientsApi";

const useCoachInfo = () => {
  const { submitFetchedDataLength, dataLength, user } = useContext(PtContext);

  // ============get the dataLength and set it state ===================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosCall.get("/dataLength");
        // ======if client is new we need to create a dataLength for him else we fetch the data and store it in context api

        if (data.dataLength.length === 0) {
          const data = await axiosCall.post(`/dataLength`);
          return data;
        } else {
          let workoutLength = data.dataLength[0].workoutLength;
          let dietLength = data.dataLength[0].dietLength;
          let clientLength = data.dataLength[0].clientLength;

          submitFetchedDataLength(clientLength, workoutLength, dietLength);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return { dataLength, user };
};

export default useCoachInfo;
