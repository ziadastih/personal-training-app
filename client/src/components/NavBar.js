import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosCall from "../api/clientsApi";
import { Link } from "react-router-dom";
import { PtContext } from "../context/PtContext";
import {
  AiFillHome,
  AiOutlineQuestionCircle,
  AiFillSetting,
} from "react-icons/ai";
import { BiSupport } from "react-icons/bi";

import { CgLogOut } from "react-icons/cg";

const NavBar = () => {
  // pathname to check on which page we are to set the styles for the icons
  const { pathname } = useLocation();
  const page = pathname.split("/")[1];

  const { user, resetUser, resetData } = useContext(PtContext);
  const navigate = useNavigate();

  // ======logout func

  const logoutFunc = async () => {
    try {
      const data = await axiosCall.post(`/auth/logout`);
      resetUser();
      resetData();
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // === css depend on page
  let role = user.role;

  let blueHomeIcon = page === "" || page === "coach" || page === "client";
  let blueSettingsIcon = page === "coachSettings" || page === "clientSettings";

  // =========css

  const styles = {
    fontSize: "24px",
    color: "var(--white)",
  };

  // ==============jsx  ===

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

      {pathname !== "/" && <CgLogOut style={styles} onClick={logoutFunc} />}
    </nav>
  );
};

export default NavBar;
