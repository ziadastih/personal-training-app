import axios from "axios";

// =========crud for client calls ===================

const axiosCall = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  withCredentials: true,
});

const getAllClients = async () => {
  const { data } = await axiosCall.get("/client");
  return data;
};

const searchClients = async (charachter) => {
  if (charachter.length === 0) return;
  const { data } = await axiosCall.get(`/client?name=${charachter}`);
  return data;
};

const getOneClient = async (id) => {
  const { data } = await axiosCall.get(`/client/${id}`);
  return data;
};

const deleteClient = async (id) => {
  const { data } = await axiosCall.delete(`/client/${id}`);
  return data;
};

const createClient = async ({
  firstName,
  lastName,
  email,
  password,
  number,
}) => {
  const { data } = await axiosCall.post("/client", {
    firstName,
    lastName,
    email,
    password,
    number,
  });
  return data;
};

export default axiosCall;
export {
  getAllClients,
  getOneClient,
  deleteClient,
  searchClients,
  createClient,
};
