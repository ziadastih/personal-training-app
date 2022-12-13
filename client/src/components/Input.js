const Input = ({ name, type, updateValue, value }) => {
  return (
    <div className="input-container">
      <div className="name-alert">
        <p>{name}</p>
        <p className={`alert ${name}-alert`}>please provide {name}!</p>
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
