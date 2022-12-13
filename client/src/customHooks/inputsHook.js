import { useState } from "react";
import Input from "../components/Input";
const useInputs = () => {
  const [inputsValue, setInputsValue] = useState([
    {
      name: "first name",
      value: "",
      type: "text",
      alert: false,
    },
    { name: "last name", value: "", type: "text", alert: false },
    { name: " email", value: "", type: "text", alert: false },
    { name: "number", value: "", type: "number", alert: false },
    { name: "password", value: "", type: "password", alert: false },
  ]);

  const updateInputState = (e) => {
    let name = e.target.name;
    setInputsValue((prevArr) => {
      return prevArr.map((input) => {
        return input.name === name
          ? { ...input, value: e.target.value }
          : input;
      });
    });
  };

  const inputs = inputsValue.map((input) => {
    return (
      <Input
        key={input.name}
        value={input.value}
        updateValue={updateInputState}
        name={input.name}
        type={input.type}
        alert={input.alert}
      />
    );
  });
  return [inputs];
};

export default useInputs;
