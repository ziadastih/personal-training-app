import { BiDumbbell } from "react-icons/bi";
import { BsFillPlusSquareFill } from "react-icons/bs";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import { useContext, useEffect, useState } from "react";
import { PtContext } from "../context/PtContext";
import CenterSectionBtn from "../components/CenterSectionBtn";
import { useNavigate } from "react-router-dom";
import OneProgram from "../components/programsPageComponents/OneProgram";
import axios from "axios";
// ================Programs Page =================

const ProgramsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [programs, setPrograms] = useState([]);
  const { dataLength, url } = useContext(PtContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const { data } = await axios.get(
        `${url}/api/v1/workoutProgram/?page=${page}`,
        { withCredentials: true }
      );
      setPrograms((prevPrograms) => {
        return prevPrograms, data.workoutprograms;
      });
    };

    fetchWorkouts();
  }, [dataLength, searchInput, page]);

  console.log(programs);
  // =============update search input on Change ===========

  const updateSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const programsArr = programs.map((prog) => {
    return <OneProgram key={prog._id} program={prog} />;
  });

  //   ======================program Page html ====================
  return (
    <div className="all-pages-bg">
      <PageHeader name="programs" icon={<BiDumbbell />} />
      <SearchInput name="programs" update={updateSearch} value={searchInput} />
      <div className="plus-btn" onClick={() => navigate("/createProgram")}>
        <BsFillPlusSquareFill />
      </div>
      {programs.length === 0 && (
        <CenterSectionBtn
          name="program"
          func={() => navigate("/createProgram")}
        />
      )}
      <div className="grid-col-container">{programsArr}</div>
    </div>
  );
};

export default ProgramsPage;
