import PageHeader from "../components/PageHeader";
import { HiUserGroup } from "react-icons/hi";
import SearchInput from "../components/SearchInput";
import { useState, useEffect, useContext } from "react";
import { PtContext } from "../context/PtContext";
import OneClient from "../components/OneClient";
import axios from "axios";
const ClientsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [clients, setClients] = useState([]);
  const { dataLength } = useContext(PtContext);
  const { url } = useContext(PtContext);
  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await axios.get(`${url}/api/v1/client/?count=30`, {
        withCredentials: true,
      });
      setClients(data.clientsInfo);
    };
    fetchClients();
  }, [dataLength]);

  const updateSearch = (e) => {
    setSearchInput(e.target.value);
  };

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

  return (
    <div className="all-pages-bg">
      <PageHeader name="clients" icon={<HiUserGroup />} />
      <SearchInput name="client" update={updateSearch} value={searchInput} />
      <div className="grid-col-container">{clientsArr}</div>
    </div>
  );
};

export default ClientsPage;
