import React, { useState } from "react";
import Question from "../Question";
import "./style.scss";
import QuestionModal from "../QuestionModal";

function QuestionList() {
  const [tries, setTries] = useState(5);
  const [selectedPoints, setSelectedPoints] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalQuestion, setModalQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const questionList = [
    { text: "What?", points: 1 },
    { text: "Where?", points: 1 },
    { text: "Why?", points: 1 },
    { text: "Where?", points: 1 },
    { text: "Why?", points: 1 },
    { text: "Who?", points: 2 },
    { text: "Whom?", points: 2 },
    { text: { placeholder: "questionList" }, points: null },
    { text: "Who?", points: 2 },
    { text: "Whom?", points: 3 },
    { text: "What?", points: 3 },
    { text: "Where?", points: 3 },
    { text: "Why?", points: 4 },
    { text: "Who?", points: 4 },
    { text: "Whom?", points: 5 },
  ];

  function getRandomQuestion() {
    const unansweredQuestions = questionList.filter(
      (question) =>
        !answeredQuestions.includes(question.text) && question.points !== null
    );

    if (unansweredQuestions.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    return unansweredQuestions[randomIndex].text;
  }

  function onOpen(points) {
    setSelectedPoints(selectedPoints + points);
    setTries((prevTries) => prevTries - 1);
    setOpenModal(false);
    setAnsweredQuestions([...answeredQuestions, modalQuestion.text]);
  }

  function openModalHandler(questionData) {
    if (!openModal) {
      const randomQuestion = getRandomQuestion();

      if (randomQuestion === null) {
        alert("No unanswered questions left.");
        return;
      }

      const randomPoints =
        questionData.points === null
          ? getRandomPoints()
          : questionData.points * 2;

      setModalQuestion({
        text: randomQuestion,
        points: randomPoints,
        isSpecial: questionData.points === null,
      });

      setOpenModal(true);
    } else {
      alert("Another question is already open. Please answer it first.");
    }
  }

  function closeModal() {
    setOpenModal(false);
    setModalQuestion(null);
  }

  const getRandomPoints = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  const renderQuestions = () => {
    if (tries > 0) {
      return questionList.map((question, index) => (
        <Question
          key={`${question.text}-${index}`}
          data={
            question.text.placeholder === "questionList"
              ? {
                  ...question,
                  points: question.points !== null ? question.points * 2 : null,
                }
              : question
          }
          onOpen={() => openModalHandler(question)}
        />
      ));
    }
  };

  return (
    <div className="question-list">
      <div className="question-info">
        <h2>
          Tries left: <span className="tries">{tries}</span>
        </h2>
        <h2>
          Total score: <span className="selected-points">{selectedPoints}</span>
        </h2>
      </div>
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
