import React, { useState, useEffect } from "react";
import Question from "../Question";
import "./style.scss";
import QuestionModal from "../QuestionModal";
import { useAuth } from "components/Auth";
import emailjs from "emailjs-com";
import Button from "components/Button";
import ConfirmationModal from "components/ConfirmationModal";
import { useNavigate } from "react-router-dom";

const QuestionList = () => {
  const [tries, setTries] = useState(5);
  const [selectedPoints, setSelectedPoints] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalQuestion, setModalQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showFinishConfirmation, setShowFinishConfirmation] = useState(false);
  const [emailContent, setEmailContent] = useState("");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.clear();
    }
  }, [isLoggedIn]);

  const sendEmail = async (serviceId, templateId, userId, data) => {
    try {
      const response = await emailjs.send(serviceId, templateId, data, userId);
      console.log("Email sent successfully:", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleFinishExam = () => {
    const formattedAnswers = answeredQuestions.map((qid) => {
      const question = questionList.find((q) => q.id === qid);
      return `${question.text}: ${
        userAnswers[qid] || "Not answered"
      } - Points: ${question.points || 0}`;
    });

    const emailData = {
      to_email: "anahit.asatryan.1995@gmail.com",
      answers: formattedAnswers.join("\n"),
      totalScore: selectedPoints,
    };

    console.log("Email data:", emailData);

    sendEmail(
      "service_iel426r",
      "template_k6pob5d",
      "jNaM-_urVDHHFZT3U",
      emailData
    );
    setAnsweredQuestions([]);
    setUserAnswers({});
    setEmailContent(formattedAnswers.join("\n"));
  };

  const questionList = [
    { id: 1, text: "What?", points: 1 },
    { id: 2, text: "Where?", points: 1 },
    { id: 3, text: "Why?", points: 1 },
    { id: 4, text: "Where?", points: 1 },
    { id: 5, text: "Why?", points: 1 },
    { id: 6, text: "Who?", points: 2 },
    { id: 7, text: "Whom?", points: 2 },
    { id: 8, text: { placeholder: "questionList" }, points: null },
    { id: 9, text: "Who?", points: 2 },
    { id: 10, text: "Whom?", points: 3 },
    { id: 11, text: "What?", points: 3 },
    { id: 12, text: "Where?", points: 3 },
    { id: 13, text: "Why?", points: 4 },
    { id: 14, text: "Who?", points: 4 },
    { id: 15, text: "Whom?", points: 5 },
  ];

  const openModalHandler = (questionData) => {
    if (answeredQuestions.includes(questionData.id)) {
      setOpenModal((prevOpen) => !prevOpen);
    } else {
      setModalQuestion({
        id: questionData.id,
        text: questionData.text,
        points:
          questionData.points === null
            ? getRandomPoints()
            : questionData.points,
        isSpecial: questionData.points === null,
        answer: userAnswers[questionData.id] || "",
      });

      setTries((prevTries) => prevTries - 1);
      setOpenModal(true);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setModalQuestion(null);
  };

  const getRandomPoints = () => Math.floor(Math.random() * 5) + 1;

  const onOpen = (points, userAnswer) => {
    if (!answeredQuestions.includes(modalQuestion.id)) {
      setSelectedPoints((prevPoints) => prevPoints + points);
      setAnsweredQuestions([...answeredQuestions, modalQuestion.id]);
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [modalQuestion.id]: userAnswer,
      }));
    }

    setOpenModal(false);
  };

  const handleFinishConfirmation = () => {
    handleFinishExam();
    navigate("/exam-finished");
    setShowFinishConfirmation(false);
  };

  const renderQuestions = () => {
    if (tries === 0) {
      return null;
    }

    return (
      <div className="question-container">
        {questionList.map((question) => (
          <Question
            key={question.id}
            data={
              question.text.placeholder === "questionList"
                ? {
                    ...question,
                    points: answeredQuestions.includes(question.id)
                      ? null
                      : question.points !== null
                      ? question.points * 2
                      : null,
                  }
                : question
            }
            onOpen={(userAnswer) => openModalHandler(question, userAnswer)}
          />
        ))}
      </div>
    );
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
      {renderQuestions()}
      {openModal && modalQuestion && (
        <QuestionModal
          data={modalQuestion}
          onOpen={(userAnswer) => onOpen(modalQuestion.points, userAnswer)}
          onClose={closeModal}
        />
      )}
      {showFinishConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to finish the exam?"
          onConfirm={handleFinishConfirmation}
          onCancel={() => setShowFinishConfirmation(false)}
          confirmLabel="Yes"
          cancelLabel="No"
        />
      )}
      <Button
        className="button finish-button"
        name="Finish Exam"
        onClick={() => setShowFinishConfirmation(true)}
      />
    </div>
  );
};

export default QuestionList;
