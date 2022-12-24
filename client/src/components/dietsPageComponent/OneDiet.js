import React, { useContext, useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import DeleteVerification from "../DeleteVerification";
import { PtContext } from "../../context/PtContext";

// =================One Diet Component =============

const OneDiet = React.forwardRef(({ diet, removeProgram }, ref) => {
  const [verificationState, setVerificationState] = useState(false);

  const toggleBox = () => {
    setVerificationState((prevState) => !prevState);
  };

  const navigate = useNavigate();

  // ===================toggle Box=========================

  return (
    <div className="one-diet-container" ref={ref ?? ref}>
      <div className="diet">
        <p>{diet.name}</p>
        <div
          className="tools"
          style={{
            color: "var(--blue)",
            marginRight: "30px",
          }}
        >
          <MdOutlineEditNote
            style={{ fontSize: "25px" }}
            onClick={() => navigate(`/diet/${diet._id}`)}
          />
          <BsFillTrashFill onClick={toggleBox} />
        </div>
      </div>
      <div className="total-diet-macros">
        <div className="macros-info">
          <span>cal.</span>
          <p>{diet.macros.calories}</p>
        </div>
        <div className="macros-info">
          <span>carbs</span>
          <p>{diet.macros.carbs}</p>
        </div>
        <div className="macros-info">
          <span>prot.</span>
          <p>{diet.macros.protein}</p>
        </div>
        <div className="macros-info">
          <span>fat</span>
          <p>{diet.macros.fat}</p>
        </div>
      </div>
      {/* ==================verification component =================== */}

      {verificationState && (
        <DeleteVerification
          name={diet.name}
          toggleBox={toggleBox}
          route="diet"
          index={2}
          _id={diet._id}
          removeProgram={removeProgram}
        />
      )}
    </div>
  );
});

export default OneDiet;
