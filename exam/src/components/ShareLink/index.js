import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

function ShareableLink({ departmentId }) {
  const linkToDepartment = `/start-exam/${departmentId}`;

  return (
    <div className="shareable-link">
      <p>Share this link with others:</p>
      <p>
        <Link to={linkToDepartment}>
          {window.location.origin + linkToDepartment}
        </Link>
      </p>
    </div>
  );
}

export default ShareableLink;
