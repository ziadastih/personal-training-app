import clientsApi from "./clientsApi";

const getAllPrograms = async (pageParam) => {
  const { data } = await clientsApi.get(`/workoutProgram?page=${pageParam}`);
  return data.workoutprograms;
};

const deleteProgram = async (id) => {
  const { data } = await clientsApi.delete(`/workoutProgram/${id}`);
  return data;
};

const searchPrograms = async (charachter) => {
  if (charachter.length === 0) return;
  const { data } = await clientsApi.get(`workoutProgram?name=${charachter}`);
  return data.workoutprograms;
};

export { getAllPrograms, deleteProgram, searchPrograms };
