import { BsFillTrashFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { PtContext } from "../context/PtContext";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="tools">
          <i className="fa-solid fa-user-pen" id="manage-client"></i>
          <BsFillTrashFill
            style={{ color: "var(--blue)" }}
            onClick={toggleBox}
          />
          <FaUserEdit
            style={{ color: "var(--blue)" }}
            onClick={() => navigate(`/clients/${id}`)}
          />
        </div>
      </div>

      {verificationState && (
        <div className="delete-verification-section">
          <div className="delete-verification-box">
            <h3>
              Are you sure you want to delete <span>{name}</span> ?
            </h3>
            <div className="yes-no-container">
              <button className="yes-btn" onClick={deleteUser}>
                yes
              </button>
              <button className="no-btn" onClick={toggleBox}>
                no
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneClient;
