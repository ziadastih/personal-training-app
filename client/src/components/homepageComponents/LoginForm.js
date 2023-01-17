import useInputs from "../../customHooks/inputsHook";
import { PtContext } from "../../context/PtContext";
import FormHeader from "../FormHeader";
import { loginApi } from "../../api/authApis";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useMutation } from "react-query";

// =================login form component ================

const LoginForm = ({ formState, toggleForm }) => {
  // =======inputs values , hook and role with update user from store =====
  const value = [
    { name: "email", value: "", type: "text", alert: false },
    { name: "password", value: "", type: "password", alert: false },
  ];
  const { inputs, inputsValue, resetInputs, loginAlert } = useInputs(value);
  const [role, setRole] = useState("coach");
  const { updateUser } = useContext(PtContext);
  const navigate = useNavigate();

  // ========== login func mutation ==========
  const loginFuncMutation = useMutation(loginApi, {
    onError: (error) => {
      loginAlert();
      console.log(error);
    },
    onSuccess: (data) => {
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
      toggleForm();
      navigate(`/${role}`);
    },
  });

  // ===============login function ====================

  const loginFunc = () => {
    const email = inputsValue[0].value;
    const password = inputsValue[1].value;

    loginFuncMutation.mutate({ email, password, role });
  };

  // ==================jsx  ======================

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
