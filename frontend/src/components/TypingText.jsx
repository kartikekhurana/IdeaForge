import React, { useEffect, useState } from "react";

const TypingText = ({ text, speed = 50, className = "" }) => {
  const [displayed, setDisplayed] = useState("");
 useEffect(() => {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= text.length) {
      clearInterval(interval);
      return;
    }
    setDisplayed((prev) => prev + text.charAt(i));
    i++;
  }, speed);

  return () => clearInterval(interval);
}, [text, speed]);;
  return <span className={className}>{displayed}</span>;
};

export default TypingText;
