import React from "react";
import "./style.scss";

const ExamFinished = () => {
  return (
    <div className="exam-finished-container">
      <div className="exam-finished">
        <h1>Exam Finished</h1>
        <h3>Congratulations! You have successfully completed the exam.</h3>
        <h2>
          Please note that the points may be subject to review by the teacher.
        </h2>
      </div>
    </div>
  );
};

export default ExamFinished;
