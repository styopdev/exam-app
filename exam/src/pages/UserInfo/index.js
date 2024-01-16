import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { auth, firestore } from "config/firebase";
import {
  sendSignInLinkToEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import "./style.scss";
import ExamInfo from "components/ExamInfo";
import Button from "components/Button";

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

  const handleLoginButtonClick = () => {
    if (name && email && isEmailValid) {
      handleFormSubmit();
    }
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

  const handleFormSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        "dummyPassword"
      );

      const user = userCredential.user;
      await saveUserToFirestore(user.uid, name, email);

      await sendSignInLink();

      saveToLocalStorage(email, name);

      setShowExamInfo(true);
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  const sendSignInLink = async () => {
    await sendSignInLinkToEmail(auth, email, {
      url: "https://exam-app-e70eb.com/",
      handleCodeInApp: true,
    });
  };

  const saveUserToFirestore = async (userId, name, email) => {
    const usersCollection = firestore.collection("users");

    await usersCollection.doc(userId).set({
      name,
      email,
      departmentId,
    });
  };

  const saveToLocalStorage = (email, name) => {
    window.localStorage.setItem("emailForSignIn", email);
    window.localStorage.setItem("nameForSignIn", name);
  };

  return (
    <div className="user-info-container">
      <div className="user-info">
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
          <Button
            name="Login"
            type="button"
            onClick={handleLoginButtonClick}
          ></Button>
        </form>

        {showExamInfo && <ExamInfo />}
      </div>
    </div>
  );
};

export default UserInfoForm;
