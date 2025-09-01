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

  // Focus automatico sull'input
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
        output = <p className="text-red-500">Command not found: {cmd}</p>;
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

  // scroll automatico ogni volta che la history cambia
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div
      className="bg-black text-[#FFB641] font-mono w-screen min-h-[100dvh] flex flex-col relative overflow-hidden"
      style={{ fontFamily: '"Major Mono Display", monospace' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Glitch / scanline */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="w-full h-full bg-[repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0.05) 1px)] animate-flicker"></div>
      </div>

      {/* Terminale scrollabile */}
      <div className="flex-1 max-w-4xl w-full flex flex-col pt-4 pb-48 px-4 sm:px-6 overflow-y-auto overflow-x-hidden z-10 mx-auto">
        {history.map((item, index) => (
          <div key={index} className="mb-2 w-full">
            <p className="text-left">&gt;&gt;&gt; {item.cmd}</p>
            <div className="w-full text-left">{item.output}</div>
          </div>
        ))}

        {/* Input */}
        <div className="flex items-center mt-2 w-full">
          <span className="mr-2">&gt;&gt;&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-black flex-1 outline-none text-[#FFB641] caret-[#FFB641] text-lg sm:text-base md:text-lg"
          />
        </div>

        {/* Div finale per scroll */}
        <div ref={historyEndRef}></div>
      </div>

      {/* Footer fisso */}
      <footer className="fixed bottom-0 left-0 w-full text-center bg-black text-[#fac570] text-sm border-t border-[#c28625] pt-3 pb-3 z-20 px-4 sm:px-6">
        Tip: type 0/clear, 1/whoami, 2/projects, 3/contacts, 4/blog
      </footer>
    </div>
  );
};

export default App;
