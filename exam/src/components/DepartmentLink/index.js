import React from "react";
import { Link } from "react-router-dom";
import ShareableLink from "../ShareLink";
import "./style.scss";

function DepartmentLink({ departmentId, index }) {
  return (
    <div className="department-link">
      <Link to={`/start-exam/${departmentId}`} className="link">
        Department {index}
      </Link>
      <ShareableLink departmentId={departmentId} />
    </div>
  );
}

export default DepartmentLink;
