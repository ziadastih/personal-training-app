import { BiDumbbell } from "react-icons/bi";
import { BsFillPlusSquareFill, BsDot } from "react-icons/bs";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import { useContext, useEffect, useRef, useState } from "react";
import { PtContext } from "../context/PtContext";
import CenterSectionBtn from "../components/CenterSectionBtn";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import OneProgram from "../components/programsPageComponents/OneProgram";
import axios from "axios";
// ================Programs Page =================

const ProgramsPage = () => {
  const { ref: dotRef, inView } = useInView();

  const [searchInput, setSearchInput] = useState("");
  // const effectRan = useRef(false);
  const [effectView, setEffectRan] = useState(false);
  const [page, setPage] = useState(0);

  const [programs, setPrograms] = useState([]);
  const { dataLength, url } = useContext(PtContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!effectView) {
      const fetchPrograms = async () => {
        try {
          const { data } = await axios.get(
            `${url}/api/v1/workoutProgram/?page=${page}`,
            { withCredentials: true }
          );
          let newPrograms = data.workoutprograms;

          setPrograms((prevPrograms) => {
            return [...prevPrograms, ...newPrograms];
          });
        } catch (error) {
          console.log(error);
        }
      };

      fetchPrograms();
      return () => setEffectRan(true);
    }
  }, [page]);

  useEffect(() => {
    if (inView) {
      console.log("clear");
      setPage((prevPage) => prevPage + 1);
      setEffectRan(false);
    }
  }, [inView]);

  useEffect(() => {
    const fetchedAll = dataLength[1].value === programs.length;
    return fetchedAll ? "true" : "false";
  }, []);
  // =============update search input on Change ===========

  const updateSearch = (e) => {
    setSearchInput(e.target.value);
  };
  // ============= programs arr and searched programs arr =============

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
      <div className="grid-col-container">
        {programsArr}

        {programs.length > 0 && (
          <span className="fetch-more" ref={dotRef}></span>
        )}
      </div>
    </div>
  );
};

export default ProgramsPage;
