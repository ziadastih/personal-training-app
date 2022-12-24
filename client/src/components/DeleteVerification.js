import { PtContext } from "../context/PtContext";
import { useContext } from "react";
import axios from "axios";

// =========DeleteVerification  Component ================

const DeleteVerification = ({
  name,
  _id,
  route,
  index,
  toggleBox,
  removeProgram,
}) => {
  const { url, dataLength, decreaseData } = useContext(PtContext);
  // ==============delete function  =========================
  const deleteProgram = async () => {
    try {
      const data = await axios.delete(`${url}/api/v1/${route}/${_id}`, {
        withCredentials: true,
      });

      let changedData =
        route === "workoutProgram" ? "workoutLength" : `${route}Length`;
      const updateData = await axios.patch(
        `${url}/api/v1/dataLength`,

        { [changedData]: dataLength[index].value - 1 },
        {
          withCredentials: true,
        }
      );
      decreaseData(index);
      if (route !== "client") removeProgram(_id);
      toggleBox();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={"delete-verification-section"}>
      <div className="overlay"></div>
      <div className="delete-verification-box">
        <h3>
          Are you sure you want to delete <span>{name}</span> ?
        </h3>
        <div className="yes-no-container">
          <button className="yes-btn" onClick={deleteProgram}>
            yes
          </button>
          <button className="no-btn" onClick={toggleBox}>
            no
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVerification;
