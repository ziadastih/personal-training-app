import { useState, useContext } from "react";
import axios from "axios";
import Input from "../components/Input";
import { PtContext } from "../context/PtContext";
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
      : [
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
  );
  const { url, increaseData, dataLength } = useContext(PtContext);
  const activateAlert = (name) => {
    setInputsValue((prevValues) => {
      return prevValues.map((input) => {
        return input.name === name ? { ...input, alert: true } : input;
      });
    });
  };

  const validateEmail = (emailValue) => {
    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return res.test(emailValue);
  };

  const validateInputs = async () => {
    const values = inputsValue.map((input) => {
      return input.value;
    });

    const firstName = values[0];
    const lastName = values[1];
    const email = values[2];
    const number = values[3];
    if (firstName.length < 3) return activateAlert("first name");

    if (lastName.length < 3) return activateAlert("last name");

    if (!validateEmail(email)) return activateAlert("email");

    if (number.length < 3) return activateAlert("number");

    if (values.length > 4) {
      const password = values[4];
      if (password.length < 6) return activateAlert("password");
      try {
        const data = await axios.post(`${url}/api/v1/auth/register`, {
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

      try {
        const { client } = await axios.post(
          `${url}/api/v1/client`,
          {
            firstName,
            lastName,
            email,
            number,
            password,
          },
          { withCredentials: true }
        );
        await increaseData(0);
        const updateData = await axios.patch(
          `${url}/api/v1/dataLength`,

          { clientLength: dataLength[0].value },
          {
            withCredentials: true,
          }
        );
        resetInputs();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const loginAlert = () => {
    setInputsValue((prevValues) => {
      return prevValues.map((input) => {
        return { ...input, alert: true };
      });
    });
  };

  const resetInputs = () => {
    setInputsValue((prevValues) => {
      return prevValues.map((input) => {
        return { ...input, value: "" };
      });
    });
  };

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
  return { inputs, inputsValue, resetInputs, loginAlert, validateInputs };
};

export default useInputs;
