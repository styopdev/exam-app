import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCss3,
  faGitAlt,
  faHtml5,
  faJsSquare,
  faNodeJs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";

const Animation = () => {
  return (
    <div className="stage-cube-cont">
      <div className="cube-spinner">
        <div className="face1">
          <FontAwesomeIcon icon={faNodeJs} color="#3C873A" />
        </div>
        <div className="face2">
          <FontAwesomeIcon icon={faHtml5} color="#f06529" />
        </div>
        <div className="face3">
          <FontAwesomeIcon icon={faJsSquare} color="#efd81d" />
        </div>
        <div className="face4">
          <FontAwesomeIcon icon={faReact} color="#5ed4f4" />
        </div>
        <div className="face5">
          <FontAwesomeIcon icon={faGitAlt} color="#ec4d28" />
        </div>
        <div className="face6">
          <FontAwesomeIcon icon={faCss3} color="#28a4d9" />
        </div>
      </div>
    </div>
  );
};

export default Animation;
