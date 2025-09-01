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
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const inputRef = useRef(null);
  const historyEndRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        output = <p className="text-red-500 animate-flicker">Command not found: {cmd}</p>;
    }

    setHistory((prev) => [...prev, { cmd, output }]);
    setInput("");

    setTimeout(() => {
      historyEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
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
    inputRef.current.focus();
  }, [history]);

  return (
    <div
      className="bg-black text-[#FFB641] font-mono w-screen flex justify-center relative overflow-hidden min-h-[100dvh]"
      style={{ fontFamily: '"Major Mono Display", monospace', height: windowHeight }}
      onClick={() => inputRef.current.focus()}
    >
      {/* Glitch / scanline */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="w-full h-full bg-[repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0.05) 1px)] animate-flicker"></div>
      </div>

      {/* Terminale container centrato */}
      <div className="flex-1 max-w-4xl w-full flex flex-col pb-24 px-4 sm:px-6 overflow-y-auto overflow-x-hidden z-10">
        {history.map((item, index) => (
          <div key={index} className="mb-2 animate-flicker">
            <p>&gt; {item.cmd}</p>
            {/* contenuto allineato a sinistra */}
            <div className="w-full text-left">{item.output}</div>
          </div>
        ))}

        {/* input */}
        <div className="flex items-center mt-2 animate-flicker w-full">
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

        <div ref={historyEndRef}></div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full text-center mt-4 text-[#fac570] text-sm border-t border-[#c28625] pt-2 z-10 animate-flicker px-4 sm:px-6">
        Tip: type 0/clear, 1/whoami, 2/projects, 3/contacts, 4/blog
      </footer>
    </div>
  );
};

export default App;
