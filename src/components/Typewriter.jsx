import { useState, useEffect } from "react";

const Typewriter = ({ text, speed = 10 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); // reset quando cambia il testo
    let i = 0;
    const interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval);
        return;
      }

      const char = text[i];
      setDisplayedText((prev) => prev + (char === "\n" ? "\n" : char));
      i++;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  // Converti i newline in <br />
  const formattedText = displayedText.split("\n").map((line, idx) => (
    <span key={idx}>
      {line}
      <br />
    </span>
  ));

  return <div>{formattedText}</div>;
};

export default Typewriter;
