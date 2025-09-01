import { html } from "framer-motion/client";

const Whoami = () => {
  return (
    <div className="space-y-2 flex flex-col items-start">
        <p>&gt; whoami</p>

        {/* Galleria di immagini */}
        <div className="flex space-x-4 mb-4">
            <img
            src="src\assets\me.png"
            alt="Ivan Maieli"
            className="w-44 h-64 border-2 border-green-400"
            />
            <img
            src="src\assets\me2.png"
            alt="Ivan Maieli 2"
            className="w-44 h-64 border-2 border-green-400"
            />
        </div>

        <p>Hey there! I’m <strong>Ivan Maieli</strong> – a computer nerd with a serious love for code, rockets, and caffeine.</p>
        <p>Currently, I’m diving headfirst into <strong>Computer Engineering</strong> at the University of Bologna, after surviving (and graduating with honors!) high school in Italy.</p>
        <p>I’m fluent in <strong>C, C++, Rust, Java, and Python</strong>, but my true love is <strong>systems programming and low-level languages</strong> – basically, I like to talk to computers in their own language. My life is a constant quest for knowledge, which is why you’ll often find me glued to a screen for 15+ hours a day… don’t worry, I do blink sometimes, maybe.</p>
        <p>When I’m not coding, I’m gazing at the sky. <strong>Space launches, planes, rockets… you name it</strong>, I’m fascinated. Dreaming of working for a space company, building robotics and systems that might one day leave Earth behind? Absolutely.</p>
        <p>I believe <strong>hard work pays off</strong>, a lot. So, if you ever need someone obsessed with computers, curious about the universe, and who occasionally talks to his PC like it’s a co-worker… that’s me.</p>
        
    </div>


  );
};

export default Whoami;
