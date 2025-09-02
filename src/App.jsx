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
  const inputRef = useRef(null);
  const historyEndRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

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

  return (
    <div
      className="bg-black text-[#FFB641] font-mono w-screen min-h-[100dvh] flex relative overflow-hidden"
      style={{ fontFamily: '"Space Mono", monospace' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="scanlines"></div>

      {/* Terminale scrollabile, centrato solo orizzontalmente */}
      <div className="terminal-glow flex-1 flex flex-col items-center pt-4 pb-32 px-4 sm:px-6 overflow-y-auto overflow-x-hidden z-10">
        <div className="w-full max-w-4xl">
          {history.map((item, index) => (
            <div key={index} className="mb-2 w-full">
              <p className="text-left">&gt;&gt;&gt; {item.cmd}</p>
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
              className="terminal-glow bg-transparent flex-1 outline-none text-[#FFB641] caret-[#FFB641] text-lg sm:text-base md:text-lg"
            />
          </div>

          <div ref={historyEndRef}></div>
        </div>
      </div>
    </div>
  );
};

export default App;
