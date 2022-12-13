import { useState } from "react";
import Input from "./Input";
const RegisterForm = () => {
  const [inputsValue, setInputeValue] = useState([
    {
      name: "first name",
      value: "",
      type: "text",
    },
    { name: "last name", value: "", type: "text" },
    { name: " email", value: "", type: "text" },
    { name: "number", value: "", type: "number" },
    { name: "password", value: "", type: "password" },
  ]);
  const updateInputState = (e) => {
    let name = e.target.name;
    setInputeValue((prevArr) => {
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
      />
    );
  });

  return (
    <div>
      <div className="block-container">
        <div className="box-header">
          <p>logo</p>
        </div>
        <h3>let's get started!</h3>

        <div className="form-container">
          {inputs}
          <button className="sign-up-btn btn">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
