import React from "react";
import "./style.scss";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const ExamInfo = () => {
  const navigate = useNavigate();

  const handleOKClick = () => {
    navigate("/exam-component");
  };

  return (
    <div className="exam-info-box">
      <div className="exam-info-content">
        <p className="exam-info-text">
          Welcome to the Exam! This is your chance to showcase your knowledge
          and skills.
        </p>
        <p className="exam-info-text">
          Make sure to manage your time wisely, and good luck!
        </p>
        <Button name="OK" onClick={handleOKClick} />
      </div>
    </div>
  );
};

export default ExamInfo;
