import { BiDumbbell } from "react-icons/bi";
import { BsFillPlusSquareFill } from "react-icons/bs";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import { useRef, useState, useCallback, useEffect, useContext } from "react";
import CenterSectionBtn from "../components/CenterSectionBtn";
import { useNavigate } from "react-router-dom";
import OneProgram from "../components/programsPageComponents/OneProgram";
import usePrograms from "../customHooks/usePrograms";
import { BiLoaderCircle } from "react-icons/bi";
import axios from "axios";
import { PtContext } from "../context/PtContext";
// ================Programs Page =================

const ProgramsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedPrograms, setSearchedPrograms] = useState([]);
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(0);
  const { isLoading, hasNextPage, programs, removeProgram } = usePrograms(
    pageNum,
    "workoutProgram"
  );
  const { url } = useContext(PtContext);

  // =================use effect for search ====================

  useEffect(() => {
    if (searchInput.length > 0) {
      const searchPrograms = async () => {
        try {
          const { data } = await axios.get(
            `${url}/api/v1/workoutProgram/?name=${searchInput}`,
            { withCredentials: true }
          );

          setSearchedPrograms(data.workoutprograms);
        } catch (error) {
          console.log(error);
        }
      };
      searchPrograms();
    }
  }, [searchInput]);

  // ===============searched programs array ==================
  const searchedValuesArr = searchedPrograms.map((prog) => {
    return <OneProgram key={crypto.randomUUID()} program={prog} />;
  });

  // ===============intesection observer with the ref ========================

  const observer = useRef();

  const lastProgramRef = useCallback(
    (prog) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((progs) => {
        if (progs[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (prog) observer.current.observe(prog);
    },

    [isLoading, hasNextPage]
  );

  // =============update search input on Change ===========

  const updateSearch = (e) => {
    setSearchInput(e.target.value);
  };

  // ============= programs arr  =============

  const programsArr = programs.map((prog, i) => {
    if (programs.length === i + 1) {
      return (
        <OneProgram
          ref={lastProgramRef}
          key={crypto.randomUUID()}
          program={prog}
          removeProgram={removeProgram}
        />
      );
    }

    return (
      <OneProgram
        key={crypto.randomUUID()}
        program={prog}
        removeProgram={removeProgram}
      />
    );
  });

  //   ======================program Page html ====================
  return (
    <div className="all-pages-bg">
      <PageHeader name="programs" icon={<BiDumbbell />} />
      <SearchInput name="programs" update={updateSearch} value={searchInput} />
      <div className="plus-btn" onClick={() => navigate("/createProgram")}>
        <BsFillPlusSquareFill />
      </div>
      {programsArr.length === 0 && (
        <CenterSectionBtn
          name="program"
          func={() => navigate("/createProgram")}
        />
      )}
      <div className="grid-col-container">
        {searchInput.length > 0 ? searchedValuesArr : programsArr}
        {isLoading && <BiLoaderCircle className="load" />}
      </div>
    </div>
  );
};

export default ProgramsPage;
