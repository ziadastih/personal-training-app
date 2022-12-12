import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineQuestionCircle,
  AiFillSetting,
} from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { MdLogin } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";

const NavBar = () => {
  const { pathname } = useLocation();

  const homeBlue =
    pathname === "/" ||
    pathname === "/coach/:coachId" ||
    pathname === "/client/:clientId";

  const styles = {
    fontSize: "24px",
    color: "var(--white)",
  };

  return (
    <nav className="nav-bar">
      <Link
        to={
          pathname === "/"
            ? "/"
            : pathname === "/coach/:coachId"
            ? "/coach/:coachId"
            : "/client/clienId"
        }
        style={!homeBlue ? styles : { ...styles, color: "var(--blue)" }}
      >
        <AiFillHome />
      </Link>
      {pathname !== "/" && (
        <Link style={styles}>
          <AiFillSetting />
        </Link>
      )}

      <Link style={styles}>
        <AiOutlineQuestionCircle />
      </Link>
      <Link style={styles}>
        <BiSupport />
      </Link>
      {pathname === "/" && (
        <Link style={styles}>
          <MdLogin />
        </Link>
      )}
      {pathname !== "/" && (
        <Link style={styles}>
          <CgLogOut />
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
