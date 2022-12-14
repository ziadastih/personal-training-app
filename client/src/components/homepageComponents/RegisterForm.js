import useInputs from "../../customHooks/inputsHook";
import FormHeader from "../FormHeader";

const RegisterForm = ({ formState, toggleForm }) => {
  const [inputs] = useInputs("register");

  return (
    <div>
      <div
        className={
          formState ? "block-container display-flex" : "block-container"
        }
      >
        <FormHeader name="sign up" toggleForm={toggleForm} />

        <div className="form-container">
          {inputs}
          <button className="filled-btn btn">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
