import React, { useState, useEffect } from "react";
import "./style.scss";

const Timer = ({ duration, onTimeout }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    let timerId;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        clearInterval(timerId);
      } else {
        startTimer();
      }
    };

    const startTimer = () => {
      if (timeRemaining > 0) {
        timerId = setInterval(() => {
          setTimeRemaining((prevTime) => {
            if (prevTime - 1 <= 0) {
              clearInterval(timerId);
              onTimeout();
            }
            return prevTime - 1;
          });
        }, 1000);
      } else {
        onTimeout();
      }
    };

       startTimer();

       document.addEventListener("visibilitychange", handleVisibilityChange);

       return () => {
      clearInterval(timerId);
       document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [timeRemaining, onTimeout]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="timer-container">
      <div className={`timer ${timeRemaining <= 10 ? "timer-expired" : ""}`}>
        {formatTime(timeRemaining)}
      </div>
    </div>
  );
};

export default Timer;
