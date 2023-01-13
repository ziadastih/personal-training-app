import PageHeader from "../components/PageHeader";
import { HiUserGroup } from "react-icons/hi";
import SearchInput from "../components/SearchInput";
import RegisterClient from "../components/clientsPageComponent/RegisterClient";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { BsFillPlusSquareFill } from "react-icons/bs";
import OneClient from "../components/clientsPageComponent/OneClient";
import CenterSectionBtn from "../components/CenterSectionBtn";
import { useQuery } from "react-query";
import { getAllClients, searchClients } from "../api/clientsApi";
import useDebounce from "../customHooks/useDebounce";
// =================ClientPage Component  =======================

const ClientsPage = () => {
  const [formState, setFormState] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  let clientsArr;

  const {
    isLoading,

    data: clientsData,
  } = useQuery("clients", getAllClients);

  const debouncedSearchDelay = useDebounce(searchInput, 200);

  const {
    isLoading: searching,

    data: searchedData,
  } = useQuery(
    ["searchedClient", debouncedSearchDelay],
    () => searchClients(searchInput),

    { enabled: Boolean(searchInput.length > 0) }
  );

  if (!isLoading) {
    clientsArr = clientsData.clientsInfo.map((client) => {
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
    clientsArr = searchedData.clientsInfo.map((client) => {
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

  // =============update search input on Change ===========

  const updateSearch = (e) => {
    setSearchInput(e.target.value);
  };

  // ===================toggle form ==========================
  const toggleForm = () => {
    setFormState((prevState) => !prevState);
  };

  // ====================clients page html ====================

  return (
    <div className="all-pages-bg">
      <PageHeader name="clients" icon={<HiUserGroup />} />
      <SearchInput name="client" update={updateSearch} value={searchInput} />
      <div className="plus-btn" onClick={toggleForm}>
        <BsFillPlusSquareFill />
      </div>
      {clientsArr?.length === 0 && (
        <CenterSectionBtn name="client" func={toggleForm} />
      )}
      {isLoading || (searching && <BiLoaderCircle className="load" />)}
      <RegisterClient formState={formState} toggleForm={toggleForm} />
      <div className="grid-col-container">{clientsArr}</div>
    </div>
  );
};

export default ClientsPage;
