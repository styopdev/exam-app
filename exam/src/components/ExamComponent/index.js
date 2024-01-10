import React, { useState } from "react";
import Timer from "../Timer";
import QuestionList from "../QuestionList";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const ExamComponent = () => {
  const [setTimerExpired] = useState(false);
  const [setExamFinished] = useState(false);
  const navigate = useNavigate();

  const handleTimeout = () => {
    setTimerExpired(true);
  };

  const handleFinishExam = () => {
    setExamFinished(true);
    navigate("/exam-finished");
  };

  return (
    <div className="exam-container">
      <Timer duration={600} onTimeout={handleTimeout} />
      <QuestionList />
      <Button name="Finish Exam" onClick={handleFinishExam} />
    </div>
  );
};

export default ExamComponent;
