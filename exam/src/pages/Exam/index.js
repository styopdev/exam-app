import React, { useState } from "react";
import Timer from "components/Timer";
import QuestionList from "components/QuestionList";
import Button from "components/Button";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Exam = () => {
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

export default Exam;
