import useInputs from "../../customHooks/inputsHook";
import FormHeader from "../FormHeader";
const NameBox = ({ boxState, toggleBox, assignName, name }) => {
  const value = [
    {
      name: "program name",
      value: "",
      type: "text",
      alert: false,
    },
  ];

  const { inputs, inputsValue } = useInputs(value);

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
