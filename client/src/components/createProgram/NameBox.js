import useInputs from "../../customHooks/inputsHook";
import FormHeader from "../FormHeader";
const NameBox = ({ boxState, toggleBox, assignName, name }) => {
  const { inputs, validateInput, inputsValue } = useInputs("program name");

  return (
    <div
      className={boxState ? "block-container display-flex" : "block-container"}
    >
      <FormHeader name={name} toggleForm={toggleBox} />

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
  );
};

export default NameBox;
