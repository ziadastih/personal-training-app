import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";

const ListItem = ({ item, addExercises }) => {
  const clickBox = () => {
    return addExercises(item);
  };

  return (
    <div className="item-content" onClick={clickBox}>
      {item.selected ? (
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
