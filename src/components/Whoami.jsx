const Whoami = () => {
  const fullText = `Hey there! I’m Ivan Maieli – a computer nerd with a serious love for code, rockets, and caffeine.

Currently, I’m diving headfirst into Computer Engineering at the University of Bologna, after surviving (and graduating with honors!) high school in Computer Science and Telecommunications.

I’m fluent in C, C++, Rust, Java, and Python, but my true love is systems programming and low-level languages – basically, I like to talk to computers in their own language. My life is a constant quest for knowledge, which is why you’ll often find me glued to a screen for 15+ hours a day… don’t worry, I do blink sometimes, maybe.

When I’m not coding, I’m gazing at the sky. Space launches, planes, rockets… you name it, I’m fascinated. Dreaming of working for a space company, building robotics and systems that might one day leave Earth behind? Absolutely.

I believe hard work pays off, a lot. So, if you ever need someone obsessed with computers, curious about the universe, and who occasionally talks to his PC like it’s a co-worker… that’s me.
`;

  // Splitta il testo in paragrafi
  const paragraphs = fullText.split("\n\n");

  return (
    <div className="flex terminal-glow text-celestial flex-col items-start px-4 space-y-6 text-left max-w-4xl mx-auto">
      {/* Galleria di immagini */}
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

      {/* Testo normale */}
      {paragraphs.map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
    </div>
  );
};

export default Whoami;
