import React, { useState, useEffect } from "react";
import Button from "../Button";
import "./style.scss";

function QuestionModal({ data, onOpen, onClose }) {
  const [answer, setAnswer] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(true);
  }, [data]);

  function handleAnswer() {
    onOpen(data.points);
    setIsOpen(false);
  }

  if (!data) {
    return null;
  }

  return (
    <div className={`question-modal ${isOpen ? "" : "closed"}`}>
      <div className="question-content">
        <h3>{data.text}</h3>
        <p>Points: {data.points}</p>
      </div>
      <div className="answer-section">
        <textarea
          type="text"
          placeholder="Your answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button name="Submit Answer" onClick={handleAnswer}></Button>
      </div>
    </div>
  );
}

export default QuestionModal;
