const Projects = () => {
  const projectList = [
    { name: "PoetrAI", 
      desc: 
      `PoetrAI is a haiku poetry generation software, the first of its kind. 
      The project was developed entirely in Python and uses the first fine-tuning 
      techniques on OpenAI's GPT-2 model. Through various parameter optimisations, 
      I managed to make the model perform well enough. I created it when I was 16, 
      with the aim of experimenting with AI.`  
    },
  ];

  return (
    <div className="space-y-2">
      <ul className="list-none pl-6">
        {projectList.map((proj, index) => (
          <li key={index}>
            <span className="text-celestial-dark">- {proj.name}</span> <br /> <span className="text-celestial">{proj.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
