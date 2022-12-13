import { IoIosClose } from "react-icons/io";
import useInputs from "../customHooks/inputsHook";
const LoginForm = ({ formState, toggleForm }) => {
  let inputsArr = [
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
  ];

  const [inputs] = useInputs();
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
            data-id="login form"
            onClick={toggleForm}
          />
        </div>
        <h3>login</h3>

        <div className="form-container">
          <div className="role-container">
            <p className="title">Please select your Role:</p>
            <button className="role-btn select-role">Coach</button>
            <button className="role-btn">Client</button>
          </div>
          {inputs}
          <p className="forgot-password">forgot your password?</p>
          <button className="filled-btn btn">login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
