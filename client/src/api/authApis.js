import axiosCall from "./clientsApi";

const loginApi = async ({ email, password, role }) => {
  const { data } = await axiosCall.post("/auth/login", {
    email,
    password,
    role,
  });
  return data;
};

const registerCoach = async ({
  firstName,
  lastName,
  email,
  number,
  password,
}) => {
  const data = await axiosCall.post("/auth/register", {
    firstName,
    lastName,
    email,
    number,
    password,
  });
  return data;
};

export { loginApi, registerCoach };
