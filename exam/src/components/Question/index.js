import React, { useEffect, useState } from "react";

function Question({ data, onOpen }) {
  const [isOpened, setAnswered] = useState(false);

  useEffect(() => {
    setAnswered(data.isAnswered);
  }, [data.isAnswered]);

  function open() {
    if (!isOpened) {
      const userConfirmed = window.confirm(
        "Are you sure you want to open this question?"
      );
      if (!userConfirmed) {
        return;
      }
      setAnswered(true);
      onOpen(data.points);
    } else {
      setAnswered(false);
      onOpen(data.points);
    }
  }

  const renderContent = () => {
    if (data.text.placeholder === "questionList" && data.points === null) {
      return (
        <div>
          <div>?</div>
          <div> *2</div>
        </div>
      );
    }
    return <>{data.points}</>;
  };

  return (
    <div
      onClick={open}
      className={`box box-${data.points} ${isOpened ? "opened" : ""} ${
        data.text.placeholder === "questionList" && data.points === null
          ? "special-question"
          : ""
      }`}
    >
      {renderContent()}
    </div>
  );
}

export default Question;
