import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEditNote } from "react-icons/md";
import {
  BsFillTrashFill,
  BsArrowsCollapse,
  BsArrowsExpand,
} from "react-icons/bs";

import useDays from "../../customHooks/DaysHook";

const OneProgram = ({ program }) => {
  const [overviewState, setOverviewState] = useState(false);
  const { daysArr, currentDay } = useDays();
  const navigate = useNavigate();
  console.log(currentDay);

  return (
    <div className="program-container">
      <div className="program">
        {!overviewState && (
          <BsArrowsExpand
            style={{ marginLeft: "30px", color: "var(--white)", opacity: 0.5 }}
          />
        )}
        {overviewState && (
          <BsArrowsCollapse
            style={{ marginLeft: "30px", color: "var(--white)", opacity: 0.5 }}
          />
        )}

        <p>{program.name}</p>
        <div
          className="tools"
          style={{
            color: "var(--blue)",
            marginRight: "30px",
          }}
        >
          <MdOutlineEditNote
            style={{ fontSize: "25px" }}
            onClick={() => navigate(`/program/${program._id}`)}
          />
          <BsFillTrashFill />
        </div>
      </div>

      {/* ======================overview =================== */}

      {!overviewState && (
        <div className="overview-container">
          <div className="date-stats">
            <p className="created-at">
              created at: {program.createdAt.slice(0, 10)}
            </p>
            <p className="updated-at">
              updated at: {program.updatedAt.slice(0, 10)}
            </p>
          </div>
          <div className="days-container">{daysArr}</div>
          <div className="created-workouts"></div>
        </div>
      )}
    </div>
  );
};
export default OneProgram;
