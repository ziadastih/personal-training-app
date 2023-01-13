import ListItem from "./ListItem";
import { IoIosClose } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";

const ListContainer = ({ name, originalList, formState }) => {
  const list = originalList?.map((item) => {
    return <ListItem key={crypto.randomUUID()} item={item} />;
  });

  return (
    <div className="list-container">
      {formState && <div className="overlay"></div>}
      <div className="list-content-container">
        <div className="list-header">
          <h2>add {name}</h2>
          <IoIosClose />
        </div>

        <div className="list-input">
          <input type="search" placeholder="search for exercise" />
          <AiOutlineSearch />
        </div>
        <span className="list-split-line"></span>

        <div className="list">{list}</div>
        <span className="list-split-line"></span>
        <div className="list-btn-container">
          <button className="full-btn">add {name}</button>
          <button className="full-btn">create new</button>
        </div>
      </div>
    </div>
  );
};

export default ListContainer;
