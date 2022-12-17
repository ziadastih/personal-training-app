import { PtContext } from "../context/PtContext";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import axios from "axios";
import { BiDumbbell } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";
import { useContext, useEffect } from "react";
import { GiMeal } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { RxActivityLog } from "react-icons/rx";

import NavigationBox from "../components/NavigationBox";

// ================Component ===============

const CoachHomePage = () => {
  const { url, user, setOriginalData, dataLength } = useContext(PtContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/api/v1/dataLength`, {
          withCredentials: true,
        });

        if (data.dataLength.length === 0) {
          const data = await axios.post("/api/v1/dataLength");
        } else {
          let workoutLength = data.dataLength[0].workoutLength;
          let dietLength = data.dataLength[0].dietLength;
          let clientLength = data.dataLength[0].clientLength;

          setOriginalData(clientLength, workoutLength, dietLength);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const navigate = useNavigate();

  // ==================homepage html =====================

  return (
    <div className="all-pages-bg">
      <PageHeader name="home" icon={<BsFillBellFill />} />
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
        <div className="navigation-tools-container">
          <NavigationBox
            name="clients"
            icon={<HiUserGroup />}
            func={() => navigate(`/clients`)}
          />
          <NavigationBox
            name="activities"
            icon={<RxActivityLog />}
            func={() => navigate(`/activities`)}
          />
          <NavigationBox
            name="program"
            icon={<BiDumbbell />}
            func={() => navigate(`/program`)}
          />
          <NavigationBox
            name="nutrition"
            icon={<GiMeal />}
            func={() => navigate(`/nutrition`)}
          />
        </div>
      </div>
    </div>
  );
};

export default CoachHomePage;
