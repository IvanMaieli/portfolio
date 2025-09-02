export default function Contacts() {
  const content = [
    { title: "Email", text: "ivan.maieli@gmail.com", link: "mailto:ivan.maieli@gmail.com" },
    { title: "Github", text: "github.com/IvanMaieli", link: "https://github.com/IvanMaieli" },
    { title: "LinkedIn", text: "linkedin.com/in/ivan-maieli", link: "https://linkedin.com/in/ivan-maieli" },
    { title: "Instagram", text: "instagram.com/ivan.maieli/", link: "https://www.instagram.com/ivan.maieli/" },
  ];

  return (
    <div className="space-y-2">
      <ul className="list-none pl-6">
        {content.map((cont, index) => (
          <li key={index}>
            <span className="text-celestial-dark">- {cont.title}</span> <br /> <a className="text-celestial underline" href={cont.link}>{cont.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
