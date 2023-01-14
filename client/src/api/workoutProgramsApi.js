import clientsApi from "./clientsApi";

const getAllPrograms = async ({ pageParams = 0 }) => {
  const { data } = await clientsApi.get(`/workoutProgram?page=${pageParams}`);
  return data.workoutprograms;
};

const deleteProgram = async ({ id }) => {
  const { data } = await clientsApi.delete(`/workoutProgram/${id}`);
  return data;
};

const searchPrograms = async (charachter) => {
  const { data } = await clientsApi.get(`workoutProgram?name=${charachter}`);
  return data;
};

export { getAllPrograms, deleteProgram, searchPrograms };
