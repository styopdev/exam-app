import { useEffect, useState } from "react";

function Question ({ data, onOpen }) {
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

  return (
    <div
      onClick={open}
      className={"box box-" + data.points + (isOpened ? " opened" : "")}
    >
      {data.points}
    </div>
  );
}

export default Question;
