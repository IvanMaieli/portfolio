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
  Help,
};

  const art = `
   __ _ __  _   _  __
  / //// /.' \ / |/ /
 / /| V // o // || / 
/_/ |_,'/_n_//_/|_/  `;

const App = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const historyEndRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setHistory((prev) => [
        ...prev,
        {
          cmd: "",
          output: (
            <span>
              <span style={{ whiteSpace: "pre", fontFamily: "monospace" }}>
                {art}
              </span>
              <br />
              <br />
              <span>Welcome to Ivan's terminal! <br />
              Type <strong>help</strong> to expand the commands.
              </span>
            </span>
          ),
        },
      ]);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCommand = (cmd) => {
    const normalized = cmd.toLowerCase();

    const command = commandsData.find((c) =>
      c.alias.some((a) => a.toLowerCase() === normalized)
    );

    let outputComponent;

    if (!command) {
      outputComponent = (
        <span className="error-text">Command not found: {cmd}</span>
      );
    } else if (command.alias.includes("clear")) {
      setHistory([
        {
          cmd: "",
          output: (
            <span>
              Welcome to Ivan's terminal! <br />
              Type <strong>help</strong> to expand the commands.
            </span>
          ),
        },
      ]);
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

  const getSuggestions = () => {
    const q = input.trim().toLowerCase();
    if (!q) return commandsData;
    return commandsData.filter((c) =>
      c.alias.some((a) => a.toLowerCase().startsWith(q))
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      handleCommand(input.trim());
    } else if (e.key === "Tab") {
      e.preventDefault();
      const suggestions = getSuggestions();
      if (suggestions.length > 0) {
        setInput(suggestions[0].alias[0]);
      }
    }
  };

  // Schermata di caricamento
  if (loading) {
    return (
      <div className="bg-amber w-screen h-screen flex items-center justify-center text-center px-4">
        <div className="scanlines"></div>
        <div
          className="animate-flicker font-medium"
          style={{ fontFamily: '"Rajdhani", monospace' }}
        >
          <p className="text-amber-medium text-3xl">Loading terminal...</p>
          <p className="text-amber-medium mt-2 text-2xl text-amber-medium">
            Press <strong>help</strong> to expand the commands.
          </p>
        </div>
      </div>
    );
  }

  const suggestions = getSuggestions();

  return (
    <div
      className="bg-amber font-medium text-2xl w-screen min-h-[100dvh] flex relative overflow-hidden"
      style={{ fontFamily: '"Rajdhani", monospace' }}
    >
      <div className="scanlines"></div>

      {/* Terminale scrollabile */}
      <div className="flex-1 flex flex-col items-center pt-4 pb-32 px-4 sm:px-6 overflow-y-auto overflow-x-hidden z-10">
        <div className="w-full max-w-4xl">
          {history.map((item, index) => (
            <div key={index} className="mb-2 w-full">
              {item.cmd && (
                <p className="text-amber-medium text-left"># {item.cmd}</p>
              )}
              <div className="text-amber-medium text-left">{item.output}</div>
            </div>
          ))}

          {/* Prompt */}
          <div className="text-amber-medium flex flex-col mt-2 w-full animate-flicker">
            <div className="flex items-center">
              <p className="mr-1.5">#</p>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent flex-1 outline-none text-amber-medium caret-[#FF8C00] text-2xl"
              />
            </div>

            {/* Suggerimenti alias */}
            {input.trim() && suggestions.length === 0 ? (
              <div className="mt-2 pl-6 error-text text-sm">
                Command does not exist
              </div>
            ) : (
              suggestions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-4 pl-6">
                  {suggestions.map((s, idx) => (
                    <span key={idx} className="text-celestial-dark text-sm">
                      {s.alias[0]}
                    </span>
                  ))}
                </div>
              )
            )}
          </div>

          <div ref={historyEndRef}></div>
        </div>
      </div>
    </div>
  );
};

export default App;
