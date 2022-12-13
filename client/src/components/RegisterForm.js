import useInputs from "../customHooks/inputsHook";
import { IoIosClose } from "react-icons/io";

const RegisterForm = ({ formState, toggleForm }) => {
  const { inputs } = useInputs();

  return (
    <div>
      <div
        className={
          formState ? "block-container display-flex" : "block-container"
        }
      >
        <div className="box-header">
          <p>logo</p>
          <IoIosClose
            style={{
              marginRight: "20px",
              fontSize: "30px",
              color: "var(--darkGrey)",
            }}
            data-id="register form"
            onClick={toggleForm}
          />
        </div>
        <h3>sign Up!</h3>

        <div className="form-container">
          {inputs}
          <button className="filled-btn btn">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
