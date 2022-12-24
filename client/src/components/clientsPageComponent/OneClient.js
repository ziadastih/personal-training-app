import { BsFillTrashFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteVerification from "../DeleteVerification";
// ================== One Client component ==============

const OneClient = ({ name, id, date }) => {
  const [verificationState, setVerificationState] = useState(false);
  const navigate = useNavigate();

  // ================toggle Box =================

  const toggleBox = () => {
    setVerificationState((prevState) => !prevState);
  };
  // ==============OneClient Component Html ===============

  return (
    <div>
      <div className="client">
        <div className="client-info">
          <p className="client-full-name">{name}</p>
          <span>{date}</span>
        </div>
        <div className="tools" style={{ color: "var(--blue)" }}>
          <FaUserEdit onClick={() => navigate(`/clients/${id}`)} />
          <BsFillTrashFill onClick={toggleBox} />
        </div>
      </div>

      {/* ==============delete box  ============= */}
      {verificationState && (
        <DeleteVerification
          name={name}
          toggleBox={toggleBox}
          route="client"
          index={0}
          _id={id}
        />
      )}
    </div>
  );
};

export default OneClient;
