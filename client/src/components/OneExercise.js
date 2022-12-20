import { useState } from "react";
import { GiJoin } from "react-icons/gi";

import { MdSlideshow } from "react-icons/md";
import toolImg from "../images/toolsImg.png";
import IframeContainer from "./Iframe";
const OneExercice = ({ exercise }) => {
  const [iframeState, setIframeState] = useState(false);

  const toggleIframe = () => {
    setIframeState((prevState) => !prevState);
  };

  const styles = {
    position: "absolute",
    bottom: "-22px",
    color: "var(--blue)",
    left: "50%",
    fontSize: "20px",
    zIndex: "-1",
  };

  return (
    <div className="one-exercise-container">
      {iframeState && <div className="overlay"></div>}
      {exercise.chain && <GiJoin style={styles} />}
      {exercise.chain && <GiJoin style={{ ...styles, left: "45%" }} />}

      <div className="container-top-section">
        <div className="exercise-general-info">
          <img src={toolImg} alt="" />
          <p className="chosen-exercise-name">{exercise.name}</p>
        </div>
        <div className="exercise-tools">
          {exercise.note.length > 0 && (
            <p className="note-info">{exercise.note}</p>
          )}
          <MdSlideshow
            style={{ color: "var(--blue)", fontSize: "22px" }}
            onClick={toggleIframe}
          />
        </div>
      </div>
      <div className="exercise-stats-container">
        <div className="input-container">
          <p>set:</p>
          <div id="sets-input">{exercise.set || "-"} </div>
        </div>
        <div className="input-container">
          <p>rep:</p>
          <div id="reps-input">{exercise.rep || "-"}</div>
        </div>
        <div className="input-container">
          <p>rest:</p>
          <div id="rest-input">{exercise.rest || "-"} </div>
        </div>
        <div className="input-container">
          <p>tempo:</p>
          <div id="tempo-input">{exercise.tempo || "-"}</div>
        </div>
        <div className="button-type-container">
          {exercise.type === "dropset" && (
            <button className="full-btn">dropset</button>
          )}
          {exercise.chain && <button className="full-btn">groupset</button>}
          {exercise.type === "rest-pause" && (
            <button className="full-btn">rest-pause</button>
          )}
        </div>
      </div>
      {exercise.video && (
        <IframeContainer
          toggleIframe={toggleIframe}
          videoSrc={exercise.video}
          iframeState={iframeState}
        />
      )}
    </div>
  );
};

export default OneExercice;
