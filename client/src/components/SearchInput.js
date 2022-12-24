import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = ({ name, update, value }) => {
  const styles = {
    position: "absolute",
    right: "15vw",

    color: "var(--white)",
    opacity: 0.8,
  };

  return (
    <div className="search-container">
      <AiOutlineSearch style={styles} />

      <input
        type="search"
        className="search-input"
        placeholder={`search for ${name}`}
        autoComplete="off"
        value={value}
        onChange={update}
      />
    </div>
  );
};

export default SearchInput;
