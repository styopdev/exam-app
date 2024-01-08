import React, { useState } from "react";
import Question from "../Question/index";
import "./style.scss";
import QuestionModal from "../QuestionModal";

function QuestionList() {
  const [tries, setTries] = useState(5);
  const [selectedPoints, setSelectedPoints] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalQuestion, setModalQuestion] = useState(null);

  const questionList = [
    { text: "What?", points: 1 },
    { text: "Where?", points: 1 },
    { text: "Why?", points: 1 },
    { text: "Where?", points: 1 },
    { text: "Why?", points: 1 },
    { text: "Who?", points: 2 },
    { text: "Whom?", points: 2 },
    { text: "Who?", points: 2 },
    { text: "Whom?", points: 3 },
    { text: "What?", points: 3 },
    { text: "Where?", points: 3 },
    { text: "Why?", points: 4 },
    { text: "Who?", points: 4 },
    { text: "Whom?", points: 5 },
  ];

  function onOpen(points) {
    setSelectedPoints(selectedPoints + points);
    setTries((prevTries) => prevTries - 1);
    setOpenModal(false);
  }

  function openModalHandler(questionData) {
    setModalQuestion(questionData);
    setOpenModal(true);
  }

  function closeModal() {
    setOpenModal(false);
    setModalQuestion(null);
  }

  const renderQuestions = () => {
    if (tries > 0) {
      return questionList.map((question, index) => (
        <Question
          key={`${question.text}-${index}`}
          data={question}
          onOpen={() => openModalHandler(question)}
        />
      ));
    }
  };

  return (
    <div className="question-list">
      <h2>Tries left: {tries}</h2>
      <h2>
        Total score: <span className="gray">{selectedPoints}</span>
      </h2>
      <div className="question-container">{renderQuestions()}</div>
      {openModal && modalQuestion && (
        <QuestionModal
          data={modalQuestion}
          onOpen={onOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default QuestionList;
