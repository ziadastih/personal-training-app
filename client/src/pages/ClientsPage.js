import PageHeader from "../components/PageHeader";
import { HiUserGroup } from "react-icons/hi";
import SearchInput from "../components/SearchInput";
import RegisterClient from "../components/clientsPageComponent/RegisterClient";
import { useState, useEffect, useContext } from "react";
import { PtContext } from "../context/PtContext";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillPlusSquareFill } from "react-icons/bs";
import OneClient from "../components/OneClient";
import axios from "axios";

// =================Component  =======================

const ClientsPage = () => {
  const [formState, setFormState] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [clients, setClients] = useState([]);
  const { dataLength } = useContext(PtContext);
  const { url } = useContext(PtContext);

  // ====================fetch clients depend on dataLength and searchInput ==================
  useEffect(() => {
    const fetchClients = async () => {
      if (searchInput.length === 0) {
        const { data } = await axios.get(`${url}/api/v1/client/?count=30`, {
          withCredentials: true,
        });
        setClients(data.clientsInfo);
      } else {
        const { data } = await axios.get(
          `${url}/api/v1/client/?name=${searchInput}`,
          {
            withCredentials: true,
          }
        );
        setClients(data.clientsInfo);
      }
    };
    fetchClients();
  }, [dataLength, searchInput]);

  // =============update search input on Change ===========

  const updateSearch = (e) => {
    setSearchInput(e.target.value);
  };

  // ===================toggle form ==========================
  const toggleForm = () => {
    setFormState((prevState) => !prevState);
  };

  // =============map over clients and display them ==============

  const clientsArr = clients.map((client) => {
    return (
      <OneClient
        key={client.clientId}
        id={client.clientId}
        name={`${client.clientFirstName} ${client.clientLastName}`}
        date={client.createdAt.slice(0, 10)}
      />
    );
  });

  // ====================clients page html ====================

  return (
    <div className="all-pages-bg">
      <PageHeader name="clients" icon={<HiUserGroup />} />
      <SearchInput name="client" update={updateSearch} value={searchInput} />
      <div className="plus-btn" onClick={toggleForm}>
        <BsFillPlusSquareFill />
      </div>
      {clients.length === 0 && (
        <div className="center-section-btn-container">
          <h3>create new client</h3>
          <button className="btn" onClick={toggleForm}>
            create
          </button>
        </div>
      )}

      <RegisterClient formState={formState} toggleForm={toggleForm} />
      <div className="grid-col-container">{clientsArr}</div>
    </div>
  );
};

export default ClientsPage;
