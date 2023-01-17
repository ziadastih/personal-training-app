import useInputs from "../../customHooks/inputsHook";
import FormHeader from "../FormHeader";
import { registerCoach } from "../../api/authApis";
import { useMutation } from "react-query";

// ===========register coach form component ===========================

const RegisterForm = ({ formState, toggleForm }) => {
  // =========inputs values  and inputs hook ========
  const registerInputs = [
    {
      name: "first name",
      value: "",
      type: "text",
      alert: false,
    },
    { name: "last name", value: "", type: "text", alert: false },
    { name: "email", value: "", type: "text", alert: false },
    { name: "number", value: "", type: "number", alert: false },
    { name: "password", value: "", type: "password", alert: false },
  ];

  const { inputs, validateInputs, inputsValue, resetInputs } =
    useInputs(registerInputs);

  // =======api mutation to handle request  ======

  const registerCoachMutation = useMutation(registerCoach, {
    onError: (error) => {
      console.log(error);
      validateInputs();
    },
    onSuccess: () => {
      toggleForm();
      resetInputs();
    },
  });

  // ========submit =======================
  const submitForm = () => {
    const firstName = inputsValue[0].value;
    const lastName = inputsValue[1].value;
    const email = inputsValue[2].value;
    const number = inputsValue[3].value;
    const password = inputsValue[4].value;

    registerCoachMutation.mutate({
      firstName,
      lastName,
      email,
      number,
      password,
    });
  };

  // ==========jsx ====================

  return (
    <div>
      {formState && <div className="overlay"></div>}
      <div
        className={
          formState ? "block-container display-flex" : "block-container"
        }
      >
        <FormHeader name="sign up" toggleForm={toggleForm} />

        <div className="form-container">
          {inputs}
          <button className="filled-btn btn" onClick={submitForm}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
