import { useState, useEffect } from "react";

const TypewriterContacts = ({ content, speed = 10 }) => {
  const [displayed, setDisplayed] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < content.length) {
      const item = content[currentIndex];
      let currentText = "";
      const interval = setInterval(() => {
        if (currentText.length < item.text.length) {
          currentText += item.text[currentText.length];
          setDisplayed((prev) => {
            const newArr = [...prev];
            newArr[currentIndex] = { ...item, text: currentText };
            return newArr;
          });
        } else {
          clearInterval(interval);
          setCurrentIndex((prev) => prev + 1);
        }
      }, speed);
      return () => clearInterval(interval);
    }
  }, [currentIndex, content, speed]);

  return (
    <div className="space-y-2 text-left">
      {displayed.map((item, idx) => (
        item.link ? (
          <p key={idx}>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="underline text-green-200">
              {item.text}
            </a>
          </p>
        ) : (
          <p key={idx}>{item.text}</p>
        )
      ))}
    </div>
  );
};

export default function Contacts() {
  const content = [
    { text: "Email: ivan.maieli@gmail.com", link: "mailto:ivan.maieli@gmail.com" },
    { text: "GitHub: github.com/IvanMaieli", link: "https://github.com/IvanMaieli" },
    { text: "LinkedIn: linkedin.com/in/ivan-maieli", link: "https://linkedin.com/in/ivan-maieli" },
    { text: "Instagram: instagram.com/ivan.maieli/", link: "https://www.instagram.com/ivan.maieli/" },
  ];

  return <TypewriterContacts content={content} speed={10} />;
}
