import { BsFillTrashFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { deleteClient } from "../../api/clientsApi";
import clientsApi from "../../api/clientsApi";
import { useContext } from "react";
import { PtContext } from "../../context/PtContext";
import DeleteVerification from "../DeleteVerification";
import { BiLoaderCircle } from "react-icons/bi";
// ================== One Client component ==============

const OneClient = ({ name, id, date }) => {
  const [verificationState, setVerificationState] = useState(false);
  const navigate = useNavigate();
  const { dataLength, decreaseData } = useContext(PtContext);
  const queryClient = useQueryClient();

  const deleteClientMutation = useMutation(deleteClient, {
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
      queryClient.invalidateQueries("searchedClient");
      setVerificationState(false);
    },
  });

  const deleteFunc = async () => {
    deleteClientMutation.mutate({ id });
    const updateClientLength = await clientsApi.patch("/dataLength", {
      clientLength: dataLength[0].value - 1,
    });
    decreaseData(0);
  };

  // ================toggle Box =================

  const toggleBox = () => {
    setVerificationState((prevState) => !prevState);
  };
  // ==============OneClient Component Html ===============

  return (
    <div>
      {deleteClientMutation.isLoading && <BiLoaderCircle className="load" />}
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
          deleteFunc={deleteFunc}
        />
      )}
    </div>
  );
};

export default OneClient;
