import React, { useState } from "react";
import Timer from "../Timer";
import QuestionList from "../QuestionList";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const ExamComponent = () => {
  const [timerExpired, setTimerExpired] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
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
      <div className="finish-button">
        <Button name="Finish Exam" onClick={handleFinishExam} />
      </div>
    </div>
  );
};

export default ExamComponent;
