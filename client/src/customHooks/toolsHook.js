import { BsFillTrashFill } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// ========= tools related to edit and delete  ==============

const useTools = (page, id, func) => {
  const navigate = useNavigate();
  const tools = (
    <div className="tools" style={{ color: "var(--blue)" }}>
      <MdOutlineEditNote
        style={{ fontSize: "25px" }}
        onClick={() => navigate(`/${page}/${id}`)}
      />
      <BsFillTrashFill onClick={func} />
    </div>
  );
  return { tools };
};

export default useTools;
