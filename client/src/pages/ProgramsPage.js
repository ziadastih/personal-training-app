import { BiDumbbell } from "react-icons/bi";
import { BsFillPlusSquareFill } from "react-icons/bs";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import { useRef, useState, useCallback } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import CenterSectionBtn from "../components/CenterSectionBtn";
import { useNavigate } from "react-router-dom";
import OneProgram from "../components/programsPageComponents/OneProgram";
import useDebounce from "../customHooks/useDebounce";
import { BiLoaderCircle } from "react-icons/bi";
import { getAllPrograms, searchPrograms } from "../api/workoutProgramsApi";

// ================Programs Page =================

const ProgramsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  // ==========infiniteQuery  hook fetch data and check if the array have length then set a new pageParam which is equal to our current pages length cz we started with param 0

  const {
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    data: workoutProgramsArr,
    isLoading,
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

  // =============debounce hook so we delay api call until there is > 200ms in typing

  const debouncedSearchDelay = useDebounce(searchInput, 200);

  // ==========search api call enabled only when searchInput.length  > 0
  const {
    isLoading: searching,
    isError: searchError,
    data: searchedPrograms,
  } = useQuery(
    ["searchedPrograms", debouncedSearchDelay],
    () => searchPrograms(debouncedSearchDelay),

    { enabled: Boolean(searchInput.length > 0) }
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

  // ============= programs arr display depend if we are searching or not =============

  let programsArr;

  // =========displaying  searchPrograms =======
  if (searchInput.length > 0 && !searching) {
    programsArr = searchedPrograms?.map((prog) => {
      return <OneProgram key={crypto.randomUUID()} program={prog} />;
    });
    console.log(programsArr);
  }
  // ==== displaying workoutProgramsArr =========

  if ((!isLoading || !isFetchingNextPage) && searchInput.length === 0) {
    programsArr = workoutProgramsArr?.pages.map((page) => {
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
  }

  // ========= state to check if there is programs while searching or on our initial fetch to display the center component
  const noPrograms = !programsArr
    ? false
    : programsArr.length === 0
    ? true
    : programsArr[0]?.length === 0
    ? true
    : false;

  //   ======================render  ====================
  return (
    <div className="all-pages-bg">
      {/* ============page header and search input ====== */}
      <PageHeader name="programs" icon={<BiDumbbell />} />
      <SearchInput name="programs" update={updateSearch} value={searchInput} />
      {/* =========create program and loader  ========== */}

      <div className="plus-btn" onClick={() => navigate("/createProgram")}>
        <BsFillPlusSquareFill />
      </div>
      {noPrograms && (
        <CenterSectionBtn
          name="program"
          func={() => navigate("/createProgram")}
        />
      )}
      {(isLoading || isFetchingNextPage || searching) && (
        <BiLoaderCircle className="load center-loader" />
      )}

      {/* =========== displayed programs ============= */}
      <div className="grid-col-container">{programsArr}</div>
    </div>
  );
};

export default ProgramsPage;
