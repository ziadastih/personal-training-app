import { BsFillPlusSquareFill } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import { useRef, useState, useCallback } from "react";
import CenterSectionBtn from "../components/CenterSectionBtn";
import { useNavigate } from "react-router-dom";
import OneDiet from "../components/dietsPageComponent/OneDiet";
import { BiLoaderCircle } from "react-icons/bi";
import { useInfiniteQuery } from "react-query";
import { getAllDiets, searchDiet } from "../api/dietApi";

const NutritionPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const {
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    data: dietsArr,
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

  // =============update search input on Change ===========

  const updateSearch = (e) => {
    setSearchInput(e.target.value);
  };

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

  const programsArr = dietsArr?.pages.map((page) => {
    return page.map((prog, i) => {
      if (page.length === i + 1) {
        return (
          <OneDiet key={crypto.randomUUID()} diet={prog} ref={lastProgramRef} />
        );
      }
      return <OneDiet key={crypto.randomUUID()} diet={prog} />;
    });
  });

  //=========html ======================

  return (
    <div className="all-pages-bg">
      <PageHeader name="diets" icon={<GiMeal />} />
      <SearchInput name="diets" update={updateSearch} value={searchInput} />
      <div className="plus-btn" onClick={() => navigate("/createDiet")}>
        <BsFillPlusSquareFill />
      </div>
      {programsArr?.length === 0 && (
        <CenterSectionBtn name="diet" func={() => navigate("/createDiet")} />
      )}
      <div className="grid-col-container">
        {programsArr}
        {isFetchingNextPage && <BiLoaderCircle className="load" />}
      </div>
    </div>
  );
};

export default NutritionPage;
