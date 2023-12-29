import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../../config/firebase";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import "./style.scss";
import ExamInfo from "../ExamInfo";

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
    setIsEmailValid(() => isValidEmailFormat(enteredEmail));
  };

  const isValidEmailFormat = (email) => {
    return email.includes("@");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (name && email && isEmailValid) {
      try {
        await sendSignInLink();
        saveToLocalStorage(email, name);
        setShowExamInfo(true);
      } catch (error) {
        console.error("Error handling form submission:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const sendSignInLink = async () => {
    await sendSignInLinkToEmail(auth, email, {
      url: "https://https://exam-app-e70eb.com/",
      handleCodeInApp: true,
    });
  };

  const saveToLocalStorage = (email, name) => {
    window.localStorage.setItem("emailForSignIn", email);
    window.localStorage.setItem("nameForSignIn", name);
  };

  useEffect(() => {
    const emailInput = emailInputRef.current;

    if (emailInput) {
      const handleEmailBlur = () => {
        setShowExamInfo(() => name && email && isEmailValid);
      };

      emailInput.addEventListener("blur", handleEmailBlur);

      return () => {
        emailInput.removeEventListener("blur", handleEmailBlur);
      };
    }
  }, [name, email, isEmailValid]);

  useEffect(() => {
    const handleEmailVerification = async () => {
      if (isSignInWithEmailLink(window.location.href)) {
        const email = window.localStorage.getItem("emailForSignIn");
        const name = window.localStorage.getItem("nameForSignIn");

        try {
          const result = await signInWithEmailLink(
            auth,
            email,
            window.location.href
          );
          const user = result.user;

          await user.updateProfile({ displayName: name });

          console.log("User signed in and profile updated:", user);
          alert(`Welcome, ${name}! You are now signed in.`);
        } catch (error) {
          console.error("Error signing in with email link:", error);
          alert("Error signing in with email link. Please try again.");
        }
      }
    };

    handleEmailVerification();
  }, []);

  return (
    <div className="user-info-container">
      <h2>Start Exam - Department {departmentId}</h2>
      <form onSubmit={handleFormSubmit}>
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
