import { useState } from "react";
import Input from "../components/Input";

// =============useInput custom Hook take care of displaying inputs ,  updating values and validate inputs on submit error =================

const useInputs = (value) => {
  const [inputsValue, setInputsValue] = useState(value);

  // ===========activate alert depend on the validation  =========================
  const activateAlert = (name) => {
    setInputsValue((prevValues) => {
      return prevValues.map((input) => {
        return input.name === name ? { ...input, alert: true } : input;
      });
    });
  };

  // ==========validate email with regex  ========================

  const validateEmail = (emailValue) => {
    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return res.test(emailValue);
  };

  // =====validate inputs  =======

  const validateInputs = async () => {
    const values = inputsValue.map((input) => {
      return input.value;
    });

    const firstName = values[0];
    const lastName = values[1];
    const email = values[2];
    const number = values[3];
    // =========validating inputs in order =========

    if (firstName.length < 3) activateAlert("first name");

    if (lastName.length < 3) activateAlert("last name");

    if (!validateEmail(email)) activateAlert("email");

    if (number.length < 3) activateAlert("number");

    // ======if there is a password we want to register a coach if not we want to register a client for a coach
    if (values.length > 4) {
      const password = values[4];
      if (password.length < 6) activateAlert("password");
    }
  };

  // ===================login alert ====================
  const loginAlert = () => {
    setInputsValue((prevValues) => {
      return prevValues.map((input) => {
        return { ...input, alert: true };
      });
    });
  };
  // ==========reset the values of inputs func
  const resetInputs = () => {
    setInputsValue((prevValues) => {
      return prevValues.map((input) => {
        return { ...input, value: "" };
      });
    });
  };
  // ====================update input state depend on the name of the input
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
  // =================map and display inputs depend on Input Component ====
  const inputs = inputsValue?.map((input) => {
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
  // ===============our returned func and state from the hook ========
  return { inputs, inputsValue, resetInputs, loginAlert, validateInputs };
};

export default useInputs;
