import { BiDumbbell } from "react-icons/bi";
import { BsFillPlusSquareFill, BsDot } from "react-icons/bs";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import { useContext, useEffect, useRef, useState } from "react";
import { PtContext } from "../context/PtContext";
import CenterSectionBtn from "../components/CenterSectionBtn";
import { useNavigate } from "react-router-dom";

import OneProgram from "../components/programsPageComponents/OneProgram";
import axios from "axios";
// ================Programs Page =================

const ProgramsPage = () => {
  const dotRef = useRef();
  const [searchInput, setSearchInput] = useState("");
  const effectRan = useRef(false);
  const [page, setPage] = useState(0);
  const [programs, setPrograms] = useState([]);
  const { dataLength, url } = useContext(PtContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (effectRan.current === false) {
      const fetchWorkouts = async () => {
        const { data } = await axios.get(
          `${url}/api/v1/workoutProgram/?page=${page}`,
          { withCredentials: true }
        );
        let newPrograms = data.workoutprograms;
        console.log(newPrograms);
        setPrograms((prevPrograms) => {
          return [...prevPrograms, ...newPrograms];
        });
      };

      fetchWorkouts();
      return () => (effectRan.current = true);
    }
  }, [dataLength, searchInput, page]);

  // ====================observer ========================

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          increasePage();
        }
      });
    });
    observer.observe(dotRef.current);
  }, []);

  const increasePage = () => {
    effectRan.current = false;
    setPage((prevPage) => prevPage + 1);
    console.log("observing");
  };

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
      <div className="grid-col-container">
        {programsArr}
        <span className="fetch-more" ref={dotRef}></span>
      </div>
    </div>
  );
};

export default ProgramsPage;
