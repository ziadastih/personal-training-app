import clientsApi from "./clientsApi";

const getAllDiets = async (pageParam) => {
  const { data } = await clientsApi.get(`/diet?page=${pageParam}`);
  return data.diets;
};

const searchDiet = async (charachter) => {
  const { data } = await clientsApi.get(`/diet?name=${charachter}`);
  return data;
};

const deleteDiet = async ({ id }) => {
  const { data } = await clientsApi.delete(`/diet/${id}`);
  return data;
};

export { getAllDiets, searchDiet, deleteDiet };
