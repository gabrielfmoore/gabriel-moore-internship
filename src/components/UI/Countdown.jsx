import React, { useEffect, useState } from "react";

const formatCountdown = (expiryDate, now = Date.now()) => {
  const diff = expiryDate - now;
  if (diff <= 0) {
    return "Expired";
  }
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`;
};

const Countdown = ({ expiryDate }) => {
  const [display, setDisplay] = useState(() =>
    expiryDate ? formatCountdown(expiryDate) : "",
  );

  useEffect(() => {
    if (!expiryDate) {
      return undefined;
    }

    const tick = () => setDisplay(formatCountdown(expiryDate));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  return <>{display}</>;
};

export default Countdown;
