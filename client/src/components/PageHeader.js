import { useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logoNoBg.png";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
const PageHeader = ({ name, icon }) => {
  const { pathname } = useLocation();
  const page = pathname.split("/")[1];
  const navigate = useNavigate();
  const NoBg = page === "client" || page === "coach";

  return (
    <header className={!NoBg ? "grey-bg" : ""}>
      <div className="page-header">
        {NoBg && <img src={logo} alt="" />}
        {!NoBg && <MdOutlineKeyboardBackspace onClick={() => navigate(-1)} />}
        <h2>{name}</h2>
        <div style={{ color: "var(--blue)" }}>{icon}</div>
      </div>
    </header>
  );
};

export default PageHeader;
