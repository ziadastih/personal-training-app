import { BsFillPlusSquareFill } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import { useRef, useState, useCallback, useEffect, useContext } from "react";
import CenterSectionBtn from "../components/CenterSectionBtn";
import { useNavigate } from "react-router-dom";
import OneDiet from "../components/dietsPageComponent/OneDiet";
import usePrograms from "../customHooks/usePrograms";
import { BiLoaderCircle } from "react-icons/bi";
import axios from "axios";
import { PtContext } from "../context/PtContext";

const NutritionPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedPrograms, setSearchedPrograms] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const { url } = useContext(PtContext);
  const { isLoading, hasNextPage, programs, removeProgram } = usePrograms(
    pageNum,
    "diet"
  );

  const navigate = useNavigate();

  // =================use effect for search ====================

  useEffect(() => {
    if (searchInput.length > 0) {
      const searchPrograms = async () => {
        try {
          const { data } = await axios.get(
            `${url}/api/v1/diet/?name=${searchInput}`,
            { withCredentials: true }
          );

          setSearchedPrograms(data.diets);
        } catch (error) {
          console.log(error);
        }
      };
      searchPrograms();
    }
  }, [searchInput]);

  // =============update search input on Change ===========

  const updateSearch = (e) => {
    setSearchInput(e.target.value);
  };
  // ===============searched programs array ==================
  const searchedValuesArr = searchedPrograms.map((prog) => {
    return (
      <OneDiet
        key={crypto.randomUUID()}
        diet={prog}
        removeProgram={removeProgram}
      />
    );
  });

  // ============== intersection observer, disconnecting and setting a new one on each render depend if there are more data to fetch ====================

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

  // ================displaying programs the last one with ref so we fetch more data when intersecting  ==================
  const programsArr = programs.map((prog, i) => {
    if (programs.length === i + 1) {
      return (
        <OneDiet
          key={crypto.randomUUID()}
          diet={prog}
          ref={lastProgramRef}
          removeProgram={removeProgram}
        />
      );
    }
    return (
      <OneDiet
        key={crypto.randomUUID()}
        diet={prog}
        removeProgram={removeProgram}
      />
    );
  });

  //=========html ======================
  return (
    <div className="all-pages-bg">
      <PageHeader name="diets" icon={<GiMeal />} />
      <SearchInput name="diets" update={updateSearch} value={searchInput} />
      <div className="plus-btn" onClick={() => navigate("/createDiet")}>
        <BsFillPlusSquareFill />
      </div>
      {programsArr.length === 0 && (
        <CenterSectionBtn name="diet" func={() => navigate("/createDiet")} />
      )}
      <div className="grid-col-container">
        {searchInput.length > 0 ? searchedValuesArr : programsArr}
        {isLoading && <BiLoaderCircle className="load" />}
      </div>
    </div>
  );
};

export default NutritionPage;
