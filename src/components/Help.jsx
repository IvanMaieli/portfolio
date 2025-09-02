import commandsData from "../commands.json";


const Help = () => {

  return (
    <div className="space-y-2">
      <ul className="list-none pl-6">
        {commandsData.map(comm => (
          <li key={comm.key} >
            <span className="text-celestial-dark">- {comm.alias}</span> <br /> <span className="text-celestial">{comm.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Help;
