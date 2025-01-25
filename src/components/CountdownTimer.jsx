import { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate, setIsExpired }) => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const countDownDate = new Date(targetDate).getTime();

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(intervalId);
        setTimeRemaining("EXPIRED");
        setIsExpired("expire");
      } else {
        setTimeRemaining(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [targetDate]);

  return <p className="font-bold">{timeRemaining}</p>;
};

export default CountdownTimer;
