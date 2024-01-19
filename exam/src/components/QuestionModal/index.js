import React, { useState, useEffect } from "react";
import "./style.scss";

function QuestionModal({ data, onOpen, onClose }) {
  const [answer, setAnswer] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(true);
  }, [data]);

  const handleAnswer = () => {
    onOpen(data.points, answer);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!data) {
    return null;
  }

  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <div className={`question-modal ${isOpen ? "" : "closed"}`}>
      <div className="question-content">
        <div className="points-section">
          <p>
            Points:<span>{data.points}</span>{" "}
          </p>
        </div>
        <div className="main-content">
          <h3 dangerouslySetInnerHTML={renderHTML(data.text)} />
          <div className="answer-section">
            <textarea
              type="text"
              placeholder="Your answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <div className="buttons-container">
              <button onClick={handleAnswer} className="submit-button">
                Submit Answer
              </button>
              <button onClick={handleClose} className="close-button">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionModal;
