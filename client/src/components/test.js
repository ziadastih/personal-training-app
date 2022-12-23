import { useEffect, useState } from "react";

useEffect(() => {
  if (searchInput.length > 0) {
    const searchPrograms = async () => {
      try {
        const { data } = await axios.get(
          `${url}/api/v1/workoutProgram/?name=${searchInput}`,
          { withCredentials: true }
        );
        setPrograms([]);
        setSearchedPrograms(data.workoutprograms);
        setPage(0);
      } catch (error) {
        console.log(error);
      }
    };
    searchPrograms();
  }
}, [searchInput]);

// ====================observer ========================
const increasePage = () => {
  effectRan.current = false;
  setPage((prevPage) => prevPage + 1);
};

useEffect(() => {
  console.log(programs.length);
  if (programs.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        increasePage();
        console.log("observing");
      }
    });
  });

  observer.observe(dotRef.current);
}, [programs.length]);

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
  // ==============intesection observer ======================
  const { ref: dotRef, inView } = useInView();
  const [searchInput, setSearchInput] = useState("");
  const [effectRan, setEffectRan] = useState(false);
  const [page, setPage] = useState(0);
  const [checkFetchedData, setCheck] = useState(false);
  const [programs, setPrograms] = useState([]);
  const { dataLength, url } = useContext(PtContext);
  const navigate = useNavigate();

  const resetPage = () => {
    setPage(0);
    setEffectRan(false);
  };

  useEffect(() => {
    if (!effectRan) {
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

  // ======================check if all data are fetched in case not increase the page and set the effect ran to false again

  useEffect(() => {
    const checkLength = dataLength[1].value === programs.length;
    setCheck(checkLength);
  }, [programs.length]);

  // ======================observe whenever the conditions are true, increase the page by 1 to fetch 10 more programs,and set effect ran back to false so we can detch the new data

  useEffect(() => {
    if (inView && !checkFetchedData) {
      console.log("clear");
      setPage((prevPage) => prevPage + 1);
      setEffectRan(false);
    }
  }, [inView]);

  // =============update search input on Change ===========

  const updateSearch = (e) => {
    setSearchInput(e.target.value);
  };
  // ============= programs arr and searched programs arr =============

  const programsArr = programs.map((prog) => {
    return (
      <OneProgram
        key={crypto.randomUUID()}
        program={prog}
        resetPage={resetPage}
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

// export default ProgramsPage;
