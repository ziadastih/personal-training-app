import React, { useContext } from "react";
import DeleteVerification from "../DeleteVerification";
import { PtContext } from "../../context/PtContext";
import { useMutation, useQueryClient } from "react-query";
import { deleteDiet } from "../../api/dietApi";
import axiosCall from "../../api/clientsApi";
import { BiLoaderCircle } from "react-icons/bi";
import useToggle from "../../customHooks/toggleHook";
import useTools from "../../customHooks/toolsHook";
// =================One Diet Component =============

const OneDiet = React.forwardRef(({ diet }, ref) => {
  const { isToggled, toggleFunc } = useToggle();
  const { tools } = useTools("editDiet", diet._id, toggleFunc);
  const { decreaseData, dataLength } = useContext(PtContext);

  const queryClient = useQueryClient();

  // ===============delete diet mutation on success update diet length  =======================

  const deleteDietMutation = useMutation(deleteDiet, {
    onSuccess: async () => {
      queryClient.invalidateQueries("dietsProgram");
      queryClient.invalidateQueries("searchedDiets");
      toggleFunc();
      try {
        await axiosCall.patch("/dataLength", {
          dietLength: dataLength[2].value - 1,
        });
        decreaseData(2);
      } catch (error) {
        console.log(error);
      }
    },
  });
  // ===============delete function ====================

  const deleteFunc = async () => {
    deleteDietMutation.mutate(diet._id);
  };

  // =================== render diet with ref if it is available=========================

  return (
    <div className="one-diet-container" ref={ref ?? ref}>
      {deleteDietMutation.isLoading && <BiLoaderCircle className="load" />}
      <div className="diet">
        {/* ========diet name and tools =========== */}
        <p>{diet.name}</p>
        {tools}
      </div>
      {/* ============total diet macros ============= */}
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

      {isToggled && (
        <DeleteVerification
          name={diet.name}
          toggleBox={toggleFunc}
          deleteFunc={deleteFunc}
        />
      )}
    </div>
  );
});

export default OneDiet;
