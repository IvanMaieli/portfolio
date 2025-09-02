export default function Contacts() {
  const content = [
    { text: "Email: ivan.maieli@gmail.com", link: "mailto:ivan.maieli@gmail.com" },
    { text: "GitHub: github.com/IvanMaieli", link: "https://github.com/IvanMaieli" },
    { text: "LinkedIn: linkedin.com/in/ivan-maieli", link: "https://linkedin.com/in/ivan-maieli" },
    { text: "Instagram: instagram.com/ivan.maieli/", link: "https://www.instagram.com/ivan.maieli/" },
  ];

  return (
    <div className="space-y-2 text-left">
      {content.map((item, idx) => (
        <p key={idx}>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#55ead4]"
          >
            {item.text}
          </a>
        </p>
      ))}
    </div>
  );
}
