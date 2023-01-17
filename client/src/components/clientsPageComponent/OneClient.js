import { useMutation, useQueryClient } from "react-query";
import axiosCall, { deleteClient } from "../../api/clientsApi";
import { useContext } from "react";
import { PtContext } from "../../context/PtContext";
import DeleteVerification from "../DeleteVerification";
import { BiLoaderCircle } from "react-icons/bi";
import useToggle from "../../customHooks/toggleHook";
import useTools from "../../customHooks/toolsHook";
// ================== One Client component ==============

const OneClient = ({ name, id, date }) => {
  const { toggleFunc, isToggled } = useToggle();
  const { dataLength, decreaseData } = useContext(PtContext);
  const queryClient = useQueryClient();

  const { tools } = useTools("clients", id, toggleFunc);

  // ===========delete client mutation on success invalidate query and update length in try catch block to handle error  ================

  const deleteClientMutation = useMutation(deleteClient, {
    onSuccess: async () => {
      queryClient.invalidateQueries("clients");
      queryClient.invalidateQueries("searchedClient");
      toggleFunc();
      try {
        await axiosCall.patch("/dataLength", {
          clientLength: dataLength[0].value - 1,
        });
        decreaseData(0);
      } catch (error) {
        console.log(error);
      }
    },
  });

  // =============delete client function  ==================

  const deleteFunc = () => {
    deleteClientMutation.mutate(id);
  };
  // ============= render One Client  ===============

  return (
    <div>
      {deleteClientMutation.isLoading && <BiLoaderCircle className="load" />}
      <div className="client">
        <div className="client-info">
          <p className="client-full-name">{name}</p>
          <span>{date}</span>
          {/* ========tools =================== */}
        </div>
        {tools}
      </div>

      {/* ==============delete box  ============= */}
      {isToggled && (
        <DeleteVerification
          name={name}
          toggleBox={toggleFunc}
          deleteFunc={deleteFunc}
        />
      )}
    </div>
  );
};

export default OneClient;
