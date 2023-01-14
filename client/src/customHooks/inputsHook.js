import { useState, useContext } from "react";
import axios from "axios";
import clientsApi, { createClient } from "../api/clientsApi";
import { useMutation, useQueryClient } from "react-query";
import Input from "../components/Input";
import { PtContext } from "../context/PtContext";

// =============useInput custom Hook =================

const useInputs = (value) => {
  const [inputsValue, setInputsValue] = useState(
    value === "register"
      ? [
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
        ]
      : value === "login"
      ? [
          { name: "email", value: "", type: "text", alert: false },
          { name: "password", value: "", type: "password", alert: false },
        ]
      : value === "client"
      ? [
          {
            name: "first name",
            value: "",
            type: "text",
            alert: false,
          },
          { name: "last name", value: "", type: "text", alert: false },
          { name: "email", value: "", type: "text", alert: false },
          { name: "number", value: "", type: "number", alert: false },
        ]
      : value === "program name"
      ? [{ name: "program name", value: "", type: "text", alert: false }]
      : [{ name: "workout name", value: "", type: "text", alert: false }]
  );
  const { increaseData, dataLength } = useContext(PtContext);

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

  const queryClient = useQueryClient();

  const createClientMutation = useMutation(createClient, {
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
    },
  });

  // ===========validate inputs and submit request to the api, depend on the inputs we have  =======================

  const validateInputs = async () => {
    const values = inputsValue.map((input) => {
      return input.value;
    });

    const firstName = values[0];
    const lastName = values[1];
    const email = values[2];
    const number = values[3];
    // =========validating inputs in order =========

    if (firstName.length < 3) return activateAlert("first name");

    if (lastName.length < 3) return activateAlert("last name");

    if (!validateEmail(email)) return activateAlert("email");

    if (number.length < 3) return activateAlert("number");

    // ======if there is a password we want to register a coach if not we want to register a client for a coach

    if (values.length > 4) {
      const password = values[4];
      if (password.length < 6) return activateAlert("password");
      try {
        const data = await clientsApi.post(`/auth/register`, {
          firstName,
          lastName,
          email,
          number,
          password,
        });
        resetInputs();
      } catch (error) {
        console.log(error.msg);
      }
    } else {
      let chars = `qwertyuiopasdfghjklzxcvbnmAQWERTYUIOPSDFGHJKLZXCVBNM1234567890!@#$%^&*()_+`;

      let password = ``;
      let lengthOfPass = 12;
      for (let i = 0; i < lengthOfPass; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      createClientMutation.mutate({
        firstName,
        lastName,
        email,
        password,
        number,
      });

      const updateData = await clientsApi.patch(
        `/dataLength`,

        { clientLength: dataLength[0].value + 1 }
      );

      increaseData(0);
      resetInputs();
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
  // ==========reset the values of inputs after successfully submitting a form
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
  // ===============our returned func and state from the hook ========
  return { inputs, inputsValue, resetInputs, loginAlert, validateInputs };
};

export default useInputs;
