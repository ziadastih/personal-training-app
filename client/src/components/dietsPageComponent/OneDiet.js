import React, { useContext, useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import DeleteVerification from "../DeleteVerification";
import { PtContext } from "../../context/PtContext";
import { useMutation, useQueryClient } from "react-query";
import { deleteDiet } from "../../api/dietApi";
import clientsApi from "../../api/clientsApi";
import { BiLoaderCircle } from "react-icons/bi";
// =================One Diet Component =============

const OneDiet = React.forwardRef(({ diet }, ref) => {
  const [verificationState, setVerificationState] = useState(false);
  const { decreaseData, dataLength } = useContext(PtContext);
  const toggleBox = () => {
    setVerificationState((prevState) => !prevState);
  };

  const queryClient = useQueryClient();

  // ===============delete diet mutation  =======================

  const deleteDietMutation = useMutation(deleteDiet, {
    onSuccess: () => {
      queryClient.invalidateQueries("dietsProgram");
      setVerificationState(false);
    },
  });
  // ===============delete function ====================

  const deleteFunc = async () => {
    deleteDietMutation.mutate(diet._id);

    const updateDietLength = await clientsApi.patch("/dataLength", {
      dietLength: dataLength[2].value - 1,
    });
    decreaseData(2);
  };

  const navigate = useNavigate();

  // ===================toggle Box=========================

  return (
    <div className="one-diet-container" ref={ref ?? ref}>
      {deleteDietMutation.isLoading && <BiLoaderCircle className="load" />}
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
          deleteFunc={deleteFunc}
        />
      )}
    </div>
  );
});

export default OneDiet;
