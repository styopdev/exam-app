// Question.js
import React, { useState } from "react";
import Modal from "./Modal";

function Question({ data, onOpen }) {
  const [isOpened, setAnswered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const open = () => {
    if (!isOpened) {
      setShowModal(true);
    } else {
      setAnswered(false);
      onOpen(data.points);
    }
  };

  const onConfirm = () => {
    setShowModal(false);
    setAnswered(true);
    onOpen(data.points);
  };

  const onCancel = () => {
    setShowModal(false);
  };

  const renderContent = () => {
    if (
      data.text &&
      data.text.placeholder === "questionList" &&
      data.points === null
    ) {
      return (
        <div>
          <div>?</div>
          <div> *2</div>
        </div>
      );
    }
    return <div>{data.points}</div>;
  };

  return (
    <>
      <div
        onClick={open}
        className={`box box-${data.points} ${isOpened ? "opened" : ""} ${
          data.text &&
          data.text.placeholder === "questionList" &&
          data.points === null
            ? "special-question"
            : ""
        }`}
      >
        {renderContent()}
      </div>

      {showModal && (
        <Modal
          message={`Are you sure you want to open this question with ${data.points} points?`}
          onConfirm={onConfirm}
          onCancel={onCancel}
          confirmLabel="Confirm"
          cancelLabel="Cancel"
        />
      )}
    </>
  );
}

export default Question;
