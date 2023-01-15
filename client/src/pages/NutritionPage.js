import { BsFillPlusSquareFill } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import { useRef, useState, useCallback } from "react";
import CenterSectionBtn from "../components/CenterSectionBtn";
import { useNavigate } from "react-router-dom";
import OneDiet from "../components/dietsPageComponent/OneDiet";
import { BiLoaderCircle } from "react-icons/bi";
import { useInfiniteQuery, useQuery } from "react-query";
import { getAllDiets, searchDiet } from "../api/dietApi";
import useDebounce from "../customHooks/useDebounce";
// ===========nutrition page  ==================

const NutritionPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  let programsArr;
  // ==========infinite query hook and change page params depend if the last page had length or not we set new param to our current pages length cz i started with param = 0

  const {
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    data: dietsArr,
    isLoading,
  } = useInfiniteQuery(
    "dietsProgram",
    ({ pageParam = 0 }) => getAllDiets(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length;
        return lastPage.length !== 0 ? nextPage : undefined;
      },
    }
  );
  // ===================debounce and search api call

  const debounceSearchDelay = useDebounce(searchInput, 200);

  const {
    isLoading: searching,
    data: searchedDiets,
    isError,
  } = useQuery(
    ["searchedDiets", debounceSearchDelay],
    () => searchDiet(debounceSearchDelay),
    {
      enabled: Boolean(searchInput.length > 0),
    }
  );

  // =============update search input on Change ===========

  const updateSearch = (e) => {
    setSearchInput(e.target.value);
  };

  // ===========intersection observer  func  ==================

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

  // ==========display programs depend on different condition  ========

  if (searchInput.length > 0 && !searching) {
    programsArr = searchedDiets?.map((prog) => {
      return <OneDiet key={crypto.randomUUID()} diet={prog} />;
    });
  }
  // =======if programs is last give a ref in case we still have pages

  if ((!isLoading || !isFetchingNextPage) && searchInput.length === 0) {
    programsArr = dietsArr?.pages.map((page) => {
      return page.map((prog, i) => {
        if (page.length === i + 1) {
          return (
            <OneDiet
              key={crypto.randomUUID()}
              diet={prog}
              ref={lastProgramRef}
            />
          );
        }
        return <OneDiet key={crypto.randomUUID()} diet={prog} />;
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

  //=========render  component  ======================

  return (
    <div className="all-pages-bg">
      {/* =========page header and search input  ======== */}
      <PageHeader name="diets" icon={<GiMeal />} />
      <SearchInput name="diets" update={updateSearch} value={searchInput} />
      {/* =========navigate to create diet  ============ */}
      <div className="plus-btn" onClick={() => navigate("/createDiet")}>
        <BsFillPlusSquareFill />
      </div>
      {noPrograms && (
        <CenterSectionBtn name="diet" func={() => navigate("/createDiet")} />
      )}
      {/* ==========display programs ============= */}
      <div className="grid-col-container">
        {programsArr}
        {/* ==========loading circle ============== */}
        {(isFetchingNextPage || isLoading || searching) && (
          <BiLoaderCircle className="load center-loader" />
        )}
      </div>
    </div>
  );
};

export default NutritionPage;
