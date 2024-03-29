const Input = ({ name, type, updateValue, value, alert }) => {
  return (
    <div className="input-container">
      <div className="name-alert">
        <p>{name}:</p>
        <p className={alert ? "alert show-alert" : "alert"}>
          {name === "email" || name === "ingredient"
            ? `please provide an ${name}`
            : `please provide a ${name}`}
        </p>
      </div>
      <input
        type={type}
        name={name}
        onChange={updateValue}
        value={value}
        placeholder={name}
      />
    </div>
  );
};

export default Input;
