import useInputs from "../../customHooks/inputsHook";
import FormHeader from "../FormHeader";
import axiosCall, { createClient } from "../../api/clientsApi";
import { useMutation, useQueryClient } from "react-query";
import { PtContext } from "../../context/PtContext";
import { useContext } from "react";
import useRandomPassword from "../../customHooks/passwordHook";
const RegisterClient = ({ formState, toggleForm }) => {
  const registerInputs = [
    {
      name: "first name",
      value: "",
      type: "text",
      alert: false,
    },
    { name: "last name", value: "", type: "text", alert: false },
    { name: "email", value: "", type: "text", alert: false },
    { name: "number", value: "", type: "number", alert: false },
  ];

  // inputs hook tp handle state , and password hook for random password
  const { inputs, validateInputs, resetInputs, inputsValue } =
    useInputs(registerInputs);

  const { dataLength, increaseData } = useContext(PtContext);

  const { password } = useRandomPassword(formState);

  // =========create client mutation on success update data length in try catch block on error validate inputs and log the error

  const queryClient = useQueryClient();

  const createClientMutation = useMutation(createClient, {
    onError: (error) => {
      validateInputs();
      console.log(error);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries("clients");
      resetInputs();
      toggleForm();
      try {
        await axiosCall.patch(
          `/dataLength`,

          { clientLength: dataLength[0].value + 1 }
        );
        increaseData(0);
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // ===============submit the form function ==============

  const submitForm = () => {
    const firstName = inputsValue[0].value;
    const lastName = inputsValue[1].value;
    const email = inputsValue[2].value;
    const number = inputsValue[3].value;

    createClientMutation.mutate({
      firstName,
      lastName,
      email,
      number,
      password,
    });
  };

  // =============   jsx   ============================

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
          <button className="filled-btn btn" onClick={submitForm}>
            create
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterClient;
