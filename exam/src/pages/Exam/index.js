import React, { useState } from "react";
import Timer from "components/Timer";
import QuestionList from "components/QuestionList";
import Button from "components/Button";
import ConfirmationModal from "components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Exam = () => {
  const [timerExpired, setTimerExpired] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleTimeout = () => {
    setTimerExpired(true);
  };

  const handleFinishExam = () => {
    setShowConfirmation(true);
  };

  const handleConfirmFinish = () => {
    setExamFinished(true);
    navigate("/exam-finished");
    setShowConfirmation(false);
  };

  const handleCancelFinish = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="exam-container">
      <Timer duration={600} onTimeout={handleTimeout} />
      <QuestionList />
      <div className="finish-button">
        <Button name="Finish Exam" onClick={handleFinishExam} />
      </div>
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to finish the exam?"
          onConfirm={handleConfirmFinish}
          onCancel={handleCancelFinish}
        />
      )}
    </div>
  );
};

export default Exam;
