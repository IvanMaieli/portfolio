import commandsData from "../commands.json";


const Help = () => {

  return (
    <div className="space-y-2">
      <ul className="list-none pl-6">
        {commandsData.map(comm => (
          <li key={comm.key} >
            <span className="text-green-200">- {comm.alias}</span>: {comm.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Help;
