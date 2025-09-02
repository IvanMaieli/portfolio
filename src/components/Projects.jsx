const Projects = () => {
  const projectList = [
    { name: "Cyber Portfolio", desc: "Terminal-inspired personal portfolio." },
    { name: "AI Chatbot", desc: "Experimental AI assistant using GPT models." },
    { name: "HackSim Game", desc: "Retro hacker simulator game." },
  ];

  return (
    <div className="space-y-2">
      <ul className="list-disc pl-6">
        {projectList.map((proj, index) => (
          <li key={index}>
            <span className="text-[#55ead4]">{proj.name}</span>: {proj.desc}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
