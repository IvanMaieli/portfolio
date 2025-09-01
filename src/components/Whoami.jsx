const Whoami = () => {
  return (
    <div className="flex flex-col items-start px-4 space-y-6 text-left max-w-4xl mx-auto">

      {/* Galleria di immagini con wrap */}
      <div className="flex flex-wrap gap-4 mt-4 mb-6 w-full justify-start">
        <img
          src="/me.png"
          alt="ivan_maieli"
          className="flex-1 min-w-[120px] max-w-[200px] aspect-[3/4] object-cover"
        />
        <img
          src="/me2.png"
          alt="ivan_maieli"
          className="flex-1 min-w-[120px] max-w-[200px] aspect-[3/4] object-cover"
        />

      </div>

      <p>
        Hey there! I’m <strong>Ivan Maieli</strong> – a computer nerd with a
        serious love for code, rockets, and caffeine.
      </p>
      <p>
        Currently, I’m diving headfirst into <strong>Computer Engineering</strong> at the University of Bologna, after surviving (and graduating with honors!) high school in Computer Science and Telecommunications.
      </p>
      <p>
        I’m fluent in <strong>C, C++, Rust, Java, and Python</strong>, but my true love is <strong>systems programming and low-level languages</strong> – basically, I like to talk to computers in their own language. My life is a constant quest for knowledge, which is why you’ll often find me glued to a screen for 15+ hours a day… don’t worry, I do blink sometimes, maybe.
      </p>
      <p>
        When I’m not coding, I’m gazing at the sky. <strong>Space launches, planes, rockets… you name it</strong>, I’m fascinated. Dreaming of working for a space company, building robotics and systems that might one day leave Earth behind? Absolutely.
      </p>
      <p>
        I believe <strong>hard work pays off</strong>, a lot. So, if you ever need someone obsessed with computers, curious about the universe, and who occasionally talks to his PC like it’s a co-worker… that’s me.
      </p>
    </div>
  );
};

export default Whoami;
