import axios from "axios";

const clientsApi = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  withCredentials: true,
});

const getAllClients = async () => {
  const { data } = await clientsApi.get("/client");
  return data;
};

const searchClients = async (charachter) => {
  const { data } = await clientsApi.get(`/client?name=${charachter}`);
  return data;
};

const getOneClient = async ({ id }) => {
  const { data } = await clientsApi.get(`/client/${id}`);
  return data;
};

const deleteClient = async ({ id }) => {
  const { data } = await clientsApi.delete(`/client/${id}`);
  return data;
};

export default clientsApi;
export { getAllClients, getOneClient, deleteClient, searchClients };
