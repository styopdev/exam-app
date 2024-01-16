import React from "react";
import DepartmentLink from "components/DepartmentLink";
import "./style.scss";

const departments = ["HTML", "CSS", "JavaScript", "React"];

function DepartmentSelection() {
  return (
    <div className="department-selection">
      <h2>Choose a Department</h2>
      <ul>
        {departments.map((department, index) => (
          <li key={index}>
            <DepartmentLink departmentId={department} index={index + 1} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DepartmentSelection;
