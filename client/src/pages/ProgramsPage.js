import { BiDumbbell } from "react-icons/bi";
import { BsFillPlusSquareFill } from "react-icons/bs";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import { useRef, useState, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import CenterSectionBtn from "../components/CenterSectionBtn";
import { useNavigate } from "react-router-dom";
import OneProgram from "../components/programsPageComponents/OneProgram";

import { BiLoaderCircle } from "react-icons/bi";
import { getAllPrograms } from "../api/workoutProgramsApi";

// ================Programs Page =================

const ProgramsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const {
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    data: workoutProgramsArr,
  } = useInfiniteQuery(
    "workoutProgramsArr",
    ({ pageParam = 0 }) => getAllPrograms(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length;
        return lastPage.length !== 0 ? nextPage : undefined;
      },
    }
  );

  // =============update search input on Change ===========

  const updateSearch = (e) => {
    setSearchInput(e.target.value);
  };

  // ===============intersection observer with the ref ========================

  const observer = useRef();

  const lastProgramRef = useCallback(
    (prog) => {
      if (isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((progs) => {
        if (progs[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (prog) observer.current.observe(prog);
    },

    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  // ============= programs arr  =============

  const programsArr = workoutProgramsArr?.pages.map((page) => {
    return page.map((prog, i) => {
      if (page.length === i + 1) {
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
  });

  //   ======================program Page html ====================
  return (
    <div className="all-pages-bg">
      <PageHeader name="programs" icon={<BiDumbbell />} />
      <SearchInput name="programs" update={updateSearch} value={searchInput} />
      <div className="plus-btn" onClick={() => navigate("/createProgram")}>
        <BsFillPlusSquareFill />
      </div>
      {programsArr?.length === 0 && (
        <CenterSectionBtn
          name="program"
          func={() => navigate("/createProgram")}
        />
      )}
      <div className="grid-col-container">
        {programsArr}
        {isFetchingNextPage && <BiLoaderCircle className="load" />}
      </div>
    </div>
  );
};

export default ProgramsPage;
