import useInputs from "../../customHooks/inputsHook";
import FormHeader from "../FormHeader";
const NameBox = ({ formState, toggleForm, assignName, name }) => {
  const { inputs, validateInput, inputsValue } = useInputs("program name");

  return (
    <div>
      {formState && <div className="overlay"></div>}
      <div
        className={
          formState ? "block-container display-flex" : "block-container"
        }
      >
        <FormHeader name={name} toggleForm={toggleForm} />

        <div className="form-container">
          {inputs}

          <button
            className="filled-btn btn"
            onClick={() => assignName(inputsValue[0].value)}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameBox;
