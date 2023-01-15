import PageHeader from "../components/PageHeader";
import { HiUserGroup } from "react-icons/hi";
import SearchInput from "../components/SearchInput";
import RegisterClient from "../components/clientsPageComponent/RegisterClient";
import { useState } from "react";
import { BiLoaderCircle, BiError } from "react-icons/bi";
import { BsFillPlusSquareFill } from "react-icons/bs";
import OneClient from "../components/clientsPageComponent/OneClient";
import CenterSectionBtn from "../components/CenterSectionBtn";
import { useQuery } from "react-query";
import { getAllClients, searchClients } from "../api/clientsApi";
import useDebounce from "../customHooks/useDebounce";
import useToggle from "../customHooks/toggleHook";

// =================ClientPage Component  =======================

const ClientsPage = () => {
  const { toggleFunc: toggleRegister, isToggled } = useToggle();
  const [searchInput, setSearchInput] = useState("");

  let clientsArr;
  //===========fetch all clients query  =================

  const {
    isLoading,
    isError,
    data: clientsData,
  } = useQuery("clients", getAllClients);

  // =============debounce hook so we delay api call until there is > 200ms in typing

  const debouncedSearchDelay = useDebounce(searchInput, 200);

  // ==========search api call enabled only when searchInput.length  > 0
  const {
    isLoading: searching,
    isError: searchError,
    data: searchedData,
  } = useQuery(
    ["searchedClient", debouncedSearchDelay],
    () => searchClients(searchInput),

    { enabled: Boolean(searchInput.length > 0) }
  );

  // =========condition to display the data we want depend on the loading state
  if (!isLoading) {
    clientsArr = clientsData?.clientsInfo.map((client) => {
      return (
        <OneClient
          key={client.clientId}
          id={client.clientId}
          name={`${client.clientFirstName} ${client.clientLastName}`}
          date={client.createdAt.slice(0, 10)}
        />
      );
    });
  }

  if (searchInput.length > 0 && !searching) {
    clientsArr = searchedData?.clientsInfo.map((client) => {
      return (
        <OneClient
          key={client.clientId}
          id={client.clientId}
          name={`${client.clientFirstName} ${client.clientLastName}`}
          date={client.createdAt.slice(0, 10)}
        />
      );
    });
  }

  // ==========error handling for both requests ============

  if (isError || searchError) {
    return (
      <div className="error-center">
        <BiError />
        <p className="error-header">An Error occured please try again!</p>
      </div>
    );
  }
  // =============update search input on Change ===========

  const updateSearch = (e) => {
    setSearchInput(e.target.value);
  };

  // ==================== render page  ==========================

  return (
    <div className="all-pages-bg">
      {/* ==========page  header and search input ======= */}
      <PageHeader name="clients" icon={<HiUserGroup />} />
      <SearchInput name="client" update={updateSearch} value={searchInput} />
      {/* ========create client btns ========== */}
      <div className="plus-btn" onClick={toggleRegister}>
        <BsFillPlusSquareFill />
      </div>
      {clientsArr?.length === 0 && (
        <CenterSectionBtn name="client" func={toggleRegister} />
      )}

      {/* ================= loading icon ========== */}

      {(searching || isLoading) && (
        <BiLoaderCircle className="load center-loader" />
      )}
      {/* ===================register client form ============= */}
      <RegisterClient formState={isToggled} toggleForm={toggleRegister} />
      {/* ============display clients ============ */}
      <div className="grid-col-container">{clientsArr}</div>
    </div>
  );
};

export default ClientsPage;
