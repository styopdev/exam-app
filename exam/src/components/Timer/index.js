import React, { useState, useEffect, useRef } from "react";
import "./style.scss";

const Timer = ({ duration, onTimeout }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        clearInterval(timerRef.current);
      } else {
        startTimer();
      }
    };

    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(timerRef.current);
            onTimeout();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    };

    startTimer();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(timerRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [onTimeout]);

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
