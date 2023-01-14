import useInputs from "../../customHooks/inputsHook";
import { PtContext } from "../../context/PtContext";
import FormHeader from "../FormHeader";
import clientsApi from "../../api/clientsApi";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

// =================login form component ================

const LoginForm = ({ formState, toggleForm }) => {
  const { inputs, inputsValue, resetInputs, loginAlert } = useInputs("login");
  const [role, setRole] = useState("coach");
  const { updateUser } = useContext(PtContext);
  const navigate = useNavigate();

  // ===============login function ====================

  const loginFunc = async () => {
    const values = inputsValue.map((value) => {
      return value.value;
    });
    const email = values[0];
    const password = values[1];

    try {
      const { data } = await clientsApi.post(`auth/login`, {
        email,
        password,
        role,
      });

      // ============setting first name and last name to update user in our context api

      let id = role === "coach" ? data.coach.coachId : data.client.clientId;
      let firstName =
        role === "coach"
          ? data.coach.coachFirstName
          : data.client.clientFirstName;
      let lastName =
        role === "coach"
          ? data.coach.coachLastName
          : data.client.clientLastName;

      resetInputs();
      updateUser(role, id, firstName, lastName);
      navigate(`/${role}`);
    } catch (error) {
      loginAlert();
    }
  };

  return (
    <div>
      {formState && <div className="overlay"></div>}
      <div
        className={
          formState ? "block-container display-flex" : "block-container"
        }
      >
        <FormHeader name="login" toggleForm={toggleForm} />

        <div className="form-container">
          <div className="role-container">
            <p className="title">Please select your Role:</p>
            <button
              className={role === "coach" ? "role-btn select-role" : "role-btn"}
              onClick={() => setRole("coach")}
            >
              Coach
            </button>
            <button
              className={
                role === "client" ? "role-btn select-role" : "role-btn"
              }
              onClick={() => setRole("client")}
            >
              Client
            </button>
          </div>
          {inputs}
          <p className="forgot-password">forgot your password?</p>
          <button className="filled-btn btn" onClick={loginFunc}>
            login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
