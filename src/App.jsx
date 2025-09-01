import { useState, useEffect, useRef } from "react";
import Whoami from "./components/Whoami";
import Projects from "./components/Projects";
import Contacts from "./components/Contacts";
import Blog from "./components/Blog";

const COMMANDS = {
  "0": "clear",
  "1": "whoami",
  "2": "projects",
  "3": "contacts",
  "4": "blog",
};

const App = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef(null);
  const historyEndRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (cmd) => {
    let output;
    switch (cmd) {
      case "0":
      case "clear":
        setHistory([]);
        setInput("");
        return;
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
      case "blog":
        output = <Blog />;
        break;
      default:
        output = <p className="error-text">Command not found: {cmd}</p>;
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
      await new Promise((res) => setTimeout(res, 50));
    }
    setTyping(false);
    handleCommand(cmd);
  };

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div
      className="bg-black text-[#FFB641] font-mono w-screen min-h-[100dvh] flex relative overflow-hidden"
      style={{ fontFamily: '"IBM Plex Mono", monospace' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Overlay scanlines */}
      <div className="scanlines"></div>

      {/* Sidebar desktop */}
      <aside className="hidden md:flex terminal-glow fixed left-0 top-0 w-40 h-full bg-transparent border-r-2 border-[#c28625] p-4 z-20 flex-col gap-4">
        <h2 className="text-[#fac570] font-bold mb-2">Commands</h2>
        <ul className="flex flex-col gap-2">
          <li>0: clear</li>
          <li>1: whoami</li>
          <li>2: projects</li>
          <li>3: contacts</li>
          <li>4: blog</li>
        </ul>
      </aside>

      {/* Terminale scrollabile */}
      <div className="terminal-glow flex-1 max-w-4xl w-full flex flex-col pt-4 pb-48 px-4 sm:px-6 overflow-y-auto overflow-x-hidden z-10 mx-auto md:ml-44">
        {history.map((item, index) => (
          <div key={index} className="mb-2 w-full">
            <p className="text-left">&gt;&gt;&gt; {item.cmd}</p>
            <div className="w-full text-left">{item.output}</div>
          </div>
        ))}

        {/* Input */}
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

      {/* Footer mobile */}
      <footer className="md:hidden fixed terminal-glow bottom-0 left-0 w-full text-center bg-transparent text-[#fac570] text-sm border-t-2 border-[#c28625] pt-3 pb-3 z-20 px-4 sm:px-6">
        Commands: [ clear(0) - whoami(1) - projects(2) - contacts(3) - blog(4) ]
      </footer>
    </div>
  );
};

export default App;
