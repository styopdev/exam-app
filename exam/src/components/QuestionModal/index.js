import React, { useState, useEffect } from "react";
import "./style.scss";
import emailjs from "emailjs-com";

const EMAILJS_USER_ID = "qlx7egBEPtljhmsYz";
const EMAILJS_SERVICE_ID = "service_iel426r";
const EMAILJS_TEMPLATE_ID = "template_arn8mlt";

function QuestionModal({ data, onOpen, onClose }) {
  const storageKey = `answer_${data.id}`;
  const storedAnswer = localStorage.getItem(storageKey);

  const [answer, setAnswer] = useState(storedAnswer || "");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(!storedAnswer);
  const [isExamClosed, setIsExamClosed] = useState(false);

  useEffect(() => {
    if (data) {
      setAnswer(storedAnswer || "");
      setIsEditMode(!storedAnswer);
      setIsOpen(true);
    }
  }, [data, storedAnswer]);

  const handleAnswer = () => {
    localStorage.setItem(storageKey, answer);
    onOpen(data.points, answer);

    if (data.lastQuestion) {
      setIsExamClosed(true);
      sendEmail();
    }
  };

  const sendEmail = () => {
    const formattedAnswer = `${data.text}: ${answer} - Points: ${
      data.points || 0
    }`;

    const templateParams = {
      to_email: "anahit.asatryan.1995@gmail.com",
      subject: "Answers to Questions",
      answers: formattedAnswer,
    };

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_USER_ID
      )
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleCloseOrReopen = () => {
    setAnswer(storedAnswer);
    setIsEditMode(!storedAnswer);

    if (isOpen) {
      setIsOpen(false);
      onClose();
    } else {
      setIsOpen(true);
    }

    if (isExamClosed) {
      sendEmail();
    }
  };

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleToggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const renderHTML = (htmlString) => ({ __html: htmlString });

  return (
    <div className={`question-modal ${isOpen ? "" : "closed"}`}>
      <div className="question-content">
        <div className="points-section">
          <p>
            Points: <span>{data.points}</span>{" "}
          </p>
        </div>
        <div className="main-content">
          <h3 dangerouslySetInnerHTML={renderHTML(data.text)} />
          <div className="answer-section">
            <div>
              <textarea
                type="text"
                placeholder="Your answer"
                value={answer}
                onChange={handleChange}
                readOnly={!isEditMode}
              />
            </div>
            <div className="buttons-container">
              <button onClick={handleAnswer} className="submit-button">
                Submit Answer
              </button>
              <button onClick={handleToggleEdit} className="edit-button">
                {isEditMode ? "Save" : "Edit"}
              </button>
              <button onClick={handleCloseOrReopen} className="close-button">
                {isOpen ? "Close" : "Reopen"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionModal;
