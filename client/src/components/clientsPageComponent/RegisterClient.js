import useInputs from "../../customHooks/inputsHook";
import FormHeader from "../FormHeader";

const RegisterClient = ({ formState, toggleForm }) => {
  const { inputs, validateInputs } = useInputs("client");

  return (
    <div>
      {formState && <div className="overlay"></div>}
      <div
        className={
          formState ? "block-container display-flex" : "block-container"
        }
      >
        <FormHeader name="create client" toggleForm={toggleForm} />

        <div className="form-container">
          {inputs}
          <button className="filled-btn btn" onClick={validateInputs}>
            create
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterClient;
