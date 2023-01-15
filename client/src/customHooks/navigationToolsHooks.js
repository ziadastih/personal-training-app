import NavigationBox from "../components/NavigationBox";
import { useNavigate } from "react-router-dom";

// ============navigation tools hook for the boxes in homepage =======

const useNavigationTools = (value) => {
  const navigate = useNavigate();
  const navigation = value.map((tool) => {
    return (
      <NavigationBox
        key={crypto.randomUUID()}
        name={tool.name}
        icon={tool.icon}
        func={() => navigate(`/${tool.name}`)}
      />
    );
  });
  return { navigation };
};

export default useNavigationTools;
