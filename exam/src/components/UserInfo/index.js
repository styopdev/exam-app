import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ExamInfo from "../ExamInfo";
import "./style.scss";

const UserInfoForm = () => {
  const { departmentId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showExamInfo, setShowExamInfo] = useState(false);
  const emailInputRef = useRef(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setShowExamInfo(false);
  };

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    setIsEmailValid(isValidEmailFormat(enteredEmail));
  };

  const isValidEmailFormat = (email) => {
    return email.includes("@");
  };

  useEffect(() => {
    const emailInput = emailInputRef.current;

    if (emailInput) {
      const handleEmailBlur = () => {
        setShowExamInfo(name && email && isEmailValid);
      };

      emailInput.addEventListener("blur", handleEmailBlur);

      return () => {
        emailInput.removeEventListener("blur", handleEmailBlur);
      };
    }
  }, [name, email, isEmailValid]);

  return (
    <div className="user-info-container">
      <h2>Start Exam - Department {departmentId}</h2>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Email:
          <input
            ref={emailInputRef}
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
      </form>

      {showExamInfo && <ExamInfo />}
    </div>
  );
};

export default UserInfoForm;
