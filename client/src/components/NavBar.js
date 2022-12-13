import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { PtContext } from "../context/PtContext";
import { Link } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineQuestionCircle,
  AiFillSetting,
} from "react-icons/ai";
import { BiSupport } from "react-icons/bi";

import { CgLogOut } from "react-icons/cg";

const NavBar = () => {
  const { pathname } = useLocation();
  const page = pathname.split("/")[1];
  const { user } = useContext(PtContext);
  let role = user.role;

  let blueHomeIcon = page === "" || page === "coach" || page === "client";
  let blueSettingsIcon = page === "coachSettings" || page === "clientSettings";

  const styles = {
    fontSize: "24px",
    color: "var(--white)",
  };

  return (
    <nav className="nav-bar">
      <Link
        to={role === "" ? "/" : role === "coach" ? "/coach" : "/client"}
        style={blueHomeIcon ? { ...styles, color: "var(--blue)" } : styles}
      >
        <AiFillHome />
      </Link>

      {role !== "" && (
        <Link
          to={role === "coach" ? "/coachSettings" : "/clientSettings"}
          style={
            blueSettingsIcon ? { ...styles, color: "var(--blue)" } : styles
          }
        >
          <AiFillSetting />
        </Link>
      )}

      <Link style={styles}>
        <AiOutlineQuestionCircle />
      </Link>
      <Link style={styles}>
        <BiSupport />
      </Link>

      {pathname !== "/" && (
        <Link style={styles}>
          <CgLogOut />
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
