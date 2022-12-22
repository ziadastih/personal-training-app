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
