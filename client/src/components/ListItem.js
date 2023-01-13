import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";

const ListItem = ({ item, toggleBox }) => {
  return (
    <div className="item-content" onClick={toggleBox}>
      {item.isSelected ? (
        <MdOutlineCheckBox />
      ) : (
        <MdOutlineCheckBoxOutlineBlank />
      )}

      {item.img && <img src={item.img} className="item-img" alt="" />}
      <p className="item-name">{item.name}</p>
    </div>
  );
};

export default ListItem;
