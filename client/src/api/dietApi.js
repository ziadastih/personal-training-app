import axiosCall from "./clientsApi";

const getAllDiets = async (pageParam) => {
  const { data } = await axiosCall.get(`/diet?page=${pageParam}`);
  return data.diets;
};

const searchDiet = async (charachter) => {
  if (charachter.length === 0) return;
  const { data } = await axiosCall.get(`/diet?name=${charachter}`);
  return data.diets;
};

const deleteDiet = async (id) => {
  const { data } = await axiosCall.delete(`/diet/${id}`);
  return data;
};

export { getAllDiets, searchDiet, deleteDiet };
