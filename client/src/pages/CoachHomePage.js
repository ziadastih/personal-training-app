import PageHeader from "../components/PageHeader";
import { BiDumbbell } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { RxActivityLog } from "react-icons/rx";
import useNavigationTools from "../customHooks/navigationToolsHooks";

import useCoachInfo from "../customHooks/coachInfoHook";
// ================Component ===============

const CoachHomePage = () => {
  // ======== navigation tools hook and array to display what we need
  const value = [
    { name: "clients", icon: <HiUserGroup /> },
    { name: "activities", icon: <RxActivityLog /> },
    { name: "programs", icon: <BiDumbbell /> },
    { name: "nutrition", icon: <GiMeal /> },
  ];

  const { navigation } = useNavigationTools(value);

  // =======coach info hook  ===================

  const { user, dataLength } = useCoachInfo();

  // ==================homepage html =====================

  return (
    <div className="all-pages-bg">
      {/* ===========page header ======= */}
      <PageHeader name="home" icon={<BsFillBellFill />} />
      {/* ===== profile and dashboard ======== */}
      <div className="profile-section">
        <div className="profile-container">
          <div className="profile-info">
            <h4>coach</h4>
            <h3 className="coach-name">{`${user.firstName} ${user.lastName}`}</h3>
            <span></span>
          </div>
          <div className="dashboard-container">
            <h4>dashboard</h4>
            <div className="stat-box">
              <p>clients</p>
              <span>{dataLength[0].value}</span>
            </div>
            <div className="stat-box">
              <p>programs</p>
              <span>{dataLength[1].value}</span>
            </div>
            <div className="stat-box">
              <p>diets</p>
              <span>{dataLength[2].value}</span>
            </div>
          </div>
        </div>
      </div>
      {/* ==========navigation tools container  =========== */}
      <div className="navigation-main-container">
        <div className="navigation-tools-container">{navigation}</div>
      </div>
    </div>
  );
};

export default CoachHomePage;
