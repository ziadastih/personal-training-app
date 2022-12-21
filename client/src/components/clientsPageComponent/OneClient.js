import { BsFillTrashFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { PtContext } from "../../context/PtContext";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteVerification from "../DeleteVerification";
// ================== One Client component ==============

const OneClient = ({ name, id, date }) => {
  const [verificationState, setVerificationState] = useState(false);
  const { url, decreaseData, dataLength } = useContext(PtContext);
  const navigate = useNavigate();

  const toggleBox = () => {
    setVerificationState((prevState) => !prevState);
  };

  // ================delete user when updating the dataLenght it gives the old value so we substract 1  ==============

  const deleteUser = async () => {
    try {
      const data = await axios.delete(`${url}/api/v1/client/${id}`, {
        withCredentials: true,
      });

      decreaseData(0);

      const updateData = await axios.patch(
        `${url}/api/v1/dataLength`,

        { clientLength: dataLength[0].value - 1 },
        {
          withCredentials: true,
        }
      );

      //   =========need to reset datalength as well  =========
      toggleBox();
    } catch (error) {
      console.log(error.message);
    }
  };

  // ==============OneClient Component Html ===============

  return (
    <div>
      {verificationState && <div className="overlay"></div>}
      <div className="client">
        <div className="client-info">
          <p className="client-full-name">{name}</p>
          <span>{date}</span>
        </div>
        <div className="tools" style={{ color: "var(--blue)" }}>
          <i className="fa-solid fa-user-pen" id="manage-client"></i>
          <BsFillTrashFill onClick={toggleBox} />
          <FaUserEdit onClick={() => navigate(`/clients/${id}`)} />
        </div>
      </div>

      {verificationState && (
        <DeleteVerification
          name={name}
          deleteFunc={deleteUser}
          toggleBox={toggleBox}
        />
      )}
    </div>
  );
};

export default OneClient;
