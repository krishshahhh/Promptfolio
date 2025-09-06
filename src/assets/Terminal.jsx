import React, { useState, useRef, useEffect, useCallback } from "react";
import "../../src/App.css";

const Terminal = () => {
  const [lines, setLines] = useState([{ type: "input", value: "" }]);
  const terminalEndRef = useRef(null);

  const handleChange = (e, index) => {
    const updated = [...lines];
    updated[index].value = e.target.value;
    setLines(updated);
  };

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [lines]);

  const getCommandOutput = useCallback((command) => {
    switch (command) {
      case "help":
        return `
        <span class="section-title">Available commands:</span><br/>
        <span class="command">😎 about</span>     : <span class="desc">Who I am?</span><br/>
        <span class="command">⚒️ skills</span>    : <span class="desc">What I use!</span><br/>
        <span class="command">🗽 projects</span>  : <span class="desc">Code Highlights</span><br/>
        <span class="command">✒️ blogs</span>     : <span class="desc">Dev Diaries</span><br/>
        <span class="command">🌐 socials</span>   : <span class="desc">Contact info</span><br/>
        <span class="command">🧹 clear</span>     : <span class="desc">Clear terminal</span>
        
        `;
      case "about":
        return `
        <span>Hey! I’m <span class="highlight">Krish</span>, a <span class="highlight">19-year-old backend developer</span> who lives by the terminal.</span><br/>
        <span>I keep it simple: terminal, code editor, browser.</span><br/>
        <span>I love digging into new tech and building real-world solutions.</span><br/>
        <span>Off-duty? Music and fresh ideas keep me going.</span>`;
      case "skills":
        return `
        <div class="terminal-skill-line">
          <span class="skill-label">Languages —</span>
          <span class="skill-value">JavaScript, Python, TypeScript, C++, Go (in progress)</span>
        </div>
        <div class="terminal-skill-line">
          <span class="skill-label">Frameworks —</span>
          <span class="skill-value">React (Next.js), Express</span>
        </div>
        <div class="terminal-skill-line">
          <span class="skill-label">Tools —</span>
          <span class="skill-value">Docker, Git, PostgreSQL, MySQL, MongoDB</span>
        </div>`;
      case "projects":
        return `<div class="terminal-project-line">
  <div class="project-title">Promptfolio 🐞</div>
  <div class="project-description">
     is a terminal-style developer portfolio built with React and JavaScript.<br>
     Navigate with CLI-like commands — no GitHub repo, just raw custom code.
  </div>
</div>`;
      case "socials":
        return `<div class="socials-box">
  <div class="social-line">
    <span class="social-label">GitHub —</span>
    <a href="https://github.com/YourKrishhh69" target="_blank" class="social-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      github.com/YourKrishhh69
    </a>
  </div>

  <div class="social-line">
    <span class="social-label">LinkedIn —</span>
    <a href="https://linkedin.com/in/yourusername" target="_blank" class="social-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" viewBox="0 0 24 24">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.2 8.2h4.6v15H.2v-15zM7.98 8.2h4.41v2.09h.06c.61-1.15 2.1-2.37 4.32-2.37 4.63 0 5.48 3.05 5.48 7v8.28h-4.6v-7.34c0-1.75-.03-4-2.44-4-2.44 0-2.82 1.9-2.82 3.86v7.48h-4.6v-15z"/>
      </svg>
      linkedin.com/in/yourusername
    </a>
  </div>

  <div class="social-line">
    <span class="social-label">X —</span>
    <a href="https://x.com/Krishshah200622" target="_blank" class="social-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" viewBox="0 0 24 24">
        <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.959-2.178-1.555-3.594-1.555-2.72 0-4.924 2.204-4.924 4.924 0 .39.045.765.127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.725-.666 1.562-.666 2.457 0 1.694.863 3.191 2.175 4.067-.802-.026-1.556-.246-2.213-.615v.061c0 2.366 1.684 4.341 3.918 4.788-.41.111-.843.171-1.287.171-.315 0-.623-.03-.924-.086.624 1.951 2.435 3.376 4.584 3.416-1.68 1.317-3.809 2.104-6.115 2.104-.398 0-.79-.023-1.175-.068 2.179 1.397 4.768 2.212 7.557 2.212 9.054 0 14-7.496 14-13.986 0-.21-.005-.423-.014-.634.961-.695 1.8-1.562 2.46-2.549l-.047-.02z"/>
      </svg>
      x.com/Krishshah200622
    </a>
  </div>

  <div class="social-line">
    <span class="social-label">Email —</span>
    <a href="mailto:krishshah200622@example.com" class="social-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" viewBox="0 0 24 24">
        <path d="M12 13.065L.7 4.8C.2 4.5 0 4 .2 3.6c.2-.4.7-.6 1.1-.5l21.4 8.265c.4.15.6.65.5 1.05-.1.4-.45.65-.85.65l-21.4-8.265zM0 6.2v13.6c0 .55.45 1 1 1h22c.55 0 1-.45 1-1V6.2l-12 6.7L0 6.2z"/>
      </svg>
      krishshah200622@example.com
    </a>
  </div>
</div>
`;
     case "blogs":
    window.location.href = "https://devkrish.vercel.app";
      case "clear":
        setLines([{ type: "input", value: "" }]);
        return;
      default:
        return `<span>"${command}" is not recognized. Type <span class="highlight">help</span> to see available commands.</span>`;
    }
  }, []);

  const handleCommand = (e, index) => {
    if (e.key !== "Enter") return;

    const command = lines[index].value.trim().toLowerCase();
    const updatedLines = [...lines];
    updatedLines[index] = { type: "submitted", value: command };

    if (command === "clear") {
      setLines([{ type: "input", value: "" }]);
      return;
    }

    const output = getCommandOutput(command);
    if (!output) return;

    const outputLines = output.split("\n").filter(Boolean);
    let currentLines = [...updatedLines];

    const animateOutput = (i) => {
      if (i < outputLines.length) {
        currentLines.push({ type: "output", value: outputLines[i] });
        setLines([...currentLines]);
        setTimeout(() => animateOutput(i + 1), 90);
      } else {
        setLines([...currentLines, { type: "input", value: "" }]);
      }
    };

    animateOutput(0);
  };

  return (
    <div className="body">
      <div className="terminal">
        <div className="header">
          <span className="username">Welcome to my </span>
          <span className="host">interactive portfolio!</span><br />
          <span className="path">→ Type </span>
          <span className="help">help</span>
          <span className="last"> to see commands.</span>
        </div>

        {lines.map((line, index) => {
          switch (line.type) {
            case "input":
              return (
                <div key={index} className="input-line">
                  <span className="terminalintro">Krish@terminal</span>
                  <span className="prompt"> ~$</span>
                  <input
                    type="text"
                    className="command-input"
                    value={line.value}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleCommand(e, index)}
                    autoFocus={index === lines.length - 1}
                  />
                </div>
              );
            case "submitted":
              return (
                <div key={index} className="submitted-line">
                  <span className="prompt">~$</span> {line.value}
                </div>
              );
            case "output":
              return (
                <div
                  key={index}
                  className="output-line"
                  dangerouslySetInnerHTML={{ __html: line.value }}
                />
              );
            default:
              return null;
          }
        })}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

export default Terminal;
