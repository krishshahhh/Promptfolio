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
        <span class="command">⭐ about</span>     : <span class="desc">Who I am?</span><br/>
        <span class="command">🏆 skills</span>    : <span class="desc">What I use!</span><br/>
        <span class="command">🚀 projects</span>  : <span class="desc">Code Highlights</span><br/>
        <span class="command">🎤 socials</span>   : <span class="desc">Contact info</span><br/>
        <span class="command">🧹 clear</span>     : <span class="desc">Clear terminal</span>
        <span class="command">⚠️ rm -file</span>  : <span class="desc">try on your own Risk </span>`;
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
</div>

`;
      case "socials":
        return `<div class="socials-box">
      <div class="social-line">
        <span class="social-label">GitHub —</span>
        <a href="https://github.com/yourusername" target="_blank" class="social-link">https://github.com/YourKrishhh69</a>
      </div>
      <div class="social-line">
        <span class="social-label">LinkedIn —</span>
        <a href="https://linkedin.com/in/yourusername" target="_blank" class="social-link">https://linkedin.com/in/yourusername</a>
      </div>
      <div class="social-line">
        <span class="social-label">X —</span>
        <a href="https://x.com/Krishshah200622" target="_blank" class="social-link">https://x.com/Krishshah200622</a>
      </div>
      <div class="social-line">
        <span class="social-label">Email —</span>
        <a href="mailto:krishshah200622@gmail.com" class="social-link">krishshah200622@gmail.com</a>
      </div>
    </div>
  `;
      case "rm - file":
        window.close();
    window.location.href = "https://www.google.com";
        return  ;
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
    const outputLines = output.split("\n").filter(Boolean);
    let currentLines = [...updatedLines];

    const animateOutput = (i) => {
      if (i < outputLines.length) {
        currentLines.push({ type: "output", value: outputLines[i] });
        setLines([...currentLines]);
        setTimeout(() => animateOutput(i + 1), 120);
      } else {
        setLines([
          ...currentLines,
          { type: "space" },
          { type: "input", value: "" }
        ]);
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
          <span className="path">→ Hint: Type </span>
          <span className="help">'HELP'</span>
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
                  <span className="prompt">$</span> {line.value}
                </div>
              );
            case "output":
              return (
                <div
                  key={index}
                  className="output-line"
                  style={{ marginLeft: "1rem", whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{ __html: line.value }}
                ></div>
              );
            case "space":
              return <div key={index} style={{ height: "1rem" }} />;
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
