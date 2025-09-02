import { useState, useEffect, useRef } from "react";
import Whoami from "./components/Whoami";
import Projects from "./components/Projects";
import Contacts from "./components/Contacts";
import Blog from "./components/Blog";
import Help from "./components/Help";
import commandsData from "./commands.json";

const COMPONENT_MAP = {
  Whoami,
  Projects,
  Contacts,
  Blog,
  Help
};

const App = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true); // stato caricamento
  const inputRef = useRef(null);
  const historyEndRef = useRef(null);

  useEffect(() => {
    // focus input
    inputRef.current?.focus();
  }, [history]);

  useEffect(() => {
    // simuliamo un caricamento iniziale di 2 secondi
    const timer = setTimeout(() => {
      setLoading(false);
      setHistory((prev) => [
        ...prev,
        { cmd: "", output: <span>Welcome to the terminal! Type <strong>help</strong> to see the commands.</span> }
      ]);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCommand = (cmd) => {
    const normalized = cmd.toLowerCase();

    const command = commandsData.find(
      (c) =>
        c.key === normalized ||
        c.alias.map((a) => a.toLowerCase()).includes(normalized)
    );

    let outputComponent;

    if (!command) {
      outputComponent = (
        <span className="error-text">Command not found: {cmd}</span>
      );
    } else if (command.key === "0") {
      setHistory([]);
      setInput("");
      return;
    } else {
      const Component = COMPONENT_MAP[command.component];
      outputComponent = Component ? <Component /> : null;
    }

    setHistory((prev) => [...prev, { cmd, output: outputComponent }]);
    setInput("");

    setTimeout(() => {
      historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      handleCommand(input.trim());
    }
  };

  // Schermata di caricamento
  if (loading) {
    return (
      <div className="bg-black text-[#c5003c] text-2xl w-screen h-screen flex items-center justify-center text-center px-4">
        <div className="scanlines"></div>
        <div className="terminal-glow animate-flicker font-medium" style={{ fontFamily: '"Rajdhani", sans-serif' }}>
          <p className="text-lg sm:text-xl">Loading terminal...</p>
          <p className="mt-2 text-sm text-[#c5003c]">
            Press <strong>help</strong> to see the commands.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-black text-[#c5003c] font-medium text-xl w-screen min-h-[100dvh] flex relative overflow-hidden"
      style={{ fontFamily: '"Rajdhani", sans-serif' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="scanlines"></div>

      {/* Terminale scrollabile */}
      <div className="terminal-glow flex-1 flex flex-col items-center pt-4 pb-32 px-4 sm:px-6 overflow-y-auto overflow-x-hidden z-10">
        <div className="w-full max-w-4xl">
          {history.map((item, index) => (
            <div key={index} className="mb-2 w-full">
              {item.cmd && <p className="text-left">&gt;&gt;&gt; {item.cmd}</p>}
              <div className="text-left">{item.output}</div>
            </div>
          ))}

          {/* Prompt */}
          <div className="terminal-glow flex items-center mt-2 w-full animate-flicker">
            <span className="mr-2">&gt;&gt;&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-glow bg-transparent flex-1 outline-none text-[#c5003c] caret-[#c5003c] text-lg sm:text-base md:text-lg"
            />
          </div>

          <div ref={historyEndRef}></div>
        </div>
      </div>
    </div>
  );
};

export default App;
