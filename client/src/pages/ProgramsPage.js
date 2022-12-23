import { BiDumbbell } from "react-icons/bi";
import { BsFillPlusSquareFill } from "react-icons/bs";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import { useRef, useState, useCallback } from "react";
import CenterSectionBtn from "../components/CenterSectionBtn";
import { useNavigate } from "react-router-dom";
import OneProgram from "../components/programsPageComponents/OneProgram";
import usePrograms from "../customHooks/usePrograms";

// ================Programs Page =================

const ProgramsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(0);
  const { isLoading, hasNextPage, results } = usePrograms(pageNum);

  const intObserver = useRef();

  const lastProgramRef = useCallback(
    (prog) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((progs) => {
        if (progs[0].isIntersecting && hasNextPage) {
          console.log("we are near the last post!");
          setPageNum((prev) => prev + 1);
        }
      });
      if (prog) intObserver.current.observe(prog);
    },

    [isLoading, hasNextPage]
  );

  // =============update search input on Change ===========

  const updateSearch = (e) => {
    setSearchInput(e.target.value);
  };
  // ============= programs arr and searched programs arr =============

  const programsArr = results.map((prog, i) => {
    if (results.length === i + 1) {
      return (
        <OneProgram
          ref={lastProgramRef}
          key={crypto.randomUUID()}
          program={prog}
        />
      );
    }

    return <OneProgram key={crypto.randomUUID()} program={prog} />;
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
        {programsArr}
        {isLoading && <p>loading...</p>}
      </div>
    </div>
  );
};

export default ProgramsPage;
