import React from "react";
import Timer from "components/Timer";
import QuestionList from "components/QuestionList";
import "./style.scss";

const Exam = () => {
  const handleTimeout = () => {};

  return (
    <div className="exam-container">
      <Timer duration={600} onTimeout={handleTimeout} />
      <QuestionList />
    </div>
  );
};

export default Exam;
