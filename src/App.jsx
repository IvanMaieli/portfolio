import { useState, useEffect, useRef } from "react";
import Whoami from "./components/Whoami";
import Projects from "./components/Projects";
import Contacts from "./components/Contacts";

const COMMANDS = {
  "1": "whoami",
  "2": "projects",
  "3": "contacts",
  "4": "clear",
};

const App = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef(null);

  const handleCommand = (cmd) => {
    let output;
    switch (cmd) {
      case "1":
      case "whoami":
        output = <Whoami />;
        break;
      case "2":
      case "projects":
        output = <Projects />;
        break;
      case "3":
      case "contacts":
        output = <Contacts />;
        break;
      case "4":
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        output = <p className="text-red-500 animate-flicker">Command not found: {cmd}</p>;
    }
    
    setHistory((prev) => [...prev, { cmd, output }]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() && !typing) {
      typeCommand(input.trim().toLowerCase());
    }
  };

  const typeCommand = async (cmd) => {
    setTyping(true);
    let current = "";
    for (let i = 0; i < cmd.length; i++) {
      current += cmd[i];
      setInput(current);
      await new Promise((res) => setTimeout(res, 50)); // effetto digitazione
    }
    setTyping(false);
    handleCommand(cmd);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [history]);

  return (
    <div
      className="bg-black text-[#FFB641] font-mono w-screen h-screen p-4 flex flex-col relative overflow-hidden"
      onClick={() => inputRef.current.focus()}
      style={{ fontFamily: '"Major Mono Display", monospace' }}
    >
      {/* Glitch / scanline dinamico */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="w-full h-full bg-[repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0.05) 1px)] animate-flicker"></div>
      </div>

      {/* Terminale content */}
      <div className="flex-1 overflow-y-auto z-10 relative">
        {history.map((item, index) => (
          <div key={index} className="mb-2 animate-flicker">
            <p>&gt; {item.cmd}</p>
            <div>{item.output}</div>
          </div>
        ))}

        <div className="flex items-center mt-2 animate-flicker">
          <span className="mr-2">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-black flex-1 outline-none text-[#FFB641] caret-[#FFB641] animate-pulse text-lg sm:text-base md:text-lg"
          />
        </div>
      </div>

      {/* Footer responsive */}
      <footer className="mt-4 text-[#fac570] text-sm border-t border-[#c28625] pt-2 z-10 relative animate-flicker">
        Tip: type 1/whoami, 2/projects, 3/contacts, 4/clear
      </footer>
    </div>
  );
};

export default App;
