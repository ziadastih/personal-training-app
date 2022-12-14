import { IoIosClose } from "react-icons/io";
const FormHeader = ({ name, toggleForm }) => {
  return (
    <div className="form-header">
      <div className="box-header">
        <p>logo</p>
        <IoIosClose
          style={{
            marginRight: "20px",
            fontSize: "30px",
            color: "var(--darkGrey)",
          }}
          data-id={name}
          onClick={toggleForm}
        />
      </div>
      <h3>{name}</h3>
    </div>
  );
};

export default FormHeader;
