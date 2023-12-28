import React from "react";
import DepartmentLink from "../DepartmentLink";
import "./style.scss";

function DepartmentSelection() {
  const departments = [
    "department1",
    "department2",
    "department3",
    "department4",
  ];

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
