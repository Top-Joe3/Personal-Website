import { useState, useEffect } from "react";
import mail from "../assets/icons/mail.svg";

export function Button({ name, func, text }) {
  return (
    <button className={name} onClick={func}>
      {text}
    </button>
  );
}

export function About() {
  return (
    <div className="about">
      <h1 className="heading">Pharmacist | Full Stack Web Developer</h1>
      <p>
        I am Joseph Ackumey, a pharmacist based in Ghana. Alongside pharmacy, I
        am a full-stack web developer trained through
        <a
          href="https://www.theodinproject.com/"
          target="_blank"
          className="top-link"
        >
          {" "}
          The Odin Project
        </a>
      </p>
      <p>
        I enjoy combining healthcare knowledge with software development to
        build practical digital solutions.
      </p>
      <p>
        I'm all about creating digital solutions that improve healthcare systems
        and other areas that interest me, while enhancing user experience.
      </p>
      <Stack />
    </div>
  );
}

export function Portfolio() {
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    async function fetchProjects() {
      try {
        const response = await fetch(
          "https://api.github.com/users/Top-Joe3/repos",
          {
            signal: controller.signal,
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        const portfolio = data.filter((data) =>
          data.topics.includes("portfolio"),
        );
        setProjects(portfolio);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message);
        }
      }
    }
    fetchProjects();
    return () => controller.abort();
  }, []);
  return (
    <div className="portfolio">
      <h2>Portfolio</h2>
      <p className="portfolio-intro">
        Selected projects projects i've worked. Check out more on my{" "}
        <a
          href="https://github.com/Top-Joe3"
          target="_blank"
          className="github-link"
        >
          {" "}
          Github
        </a>
      </p>
      <div className="projects-wrapper">
        {projects &&
          projects.map((project) => {
            return (
              <div className="project" key={project.id}>
                <p>{project.description}</p>
                <div className="project-links">
                  <a
                    href={project.homepage}
                    target="_blank"
                    className="website"
                  >
                    Website
                  </a>
                  <a
                    href={project["html_url"]}
                    target="_blank"
                    className="code"
                  >
                    {" "}
                    Code
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export function Contact({theme}) {
  return (
    <div className="contacts">
      <h2>Reach out to me on</h2>
      <div className="contact-links">
        <div>
          <img src={mail} className={theme === "dark" ? "dark-mail" : "light-mail"} />
          <a href="mailto:ackumeyjoseph1@gmail.com">Email </a>
        </div>
        <div>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" />
          <a
            href="https://www.linkedin.com/in/ackumey-joseph-418817243/"
            target="_blank"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

function Stack() {
  const stack = [
    {
      id: 1,
      name: "Html",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    },
    {
      id: 2,
      name: "Javascript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    },
    {
      id: 3,
      name: "Css",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    },
    {
      id: 4,
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    },
    {
      id: 5,
      name: "Github",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    },
    {
      id: 6,
      name: "PostgreSql",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    },
    {
      id: 7,
      name: "Nodejs",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    },
    {
      id: 8,
      name: "Jest",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg",
    },
    {
      id: 9,
      name: "Express",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    },
    {
      id: 10,
      name: "Prisma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
    },
    {
      id: 11,
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    },
  ];

  useEffect(() => {
  const stackEl = document.querySelector(".stack");
  if (!stackEl) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const items = stackEl.querySelectorAll(".logo-text");

        if (entry.isIntersecting) {
          const sorted = Array.from(items).sort((a, b) => {
            const styleA = window.getComputedStyle(a);
            const styleB = window.getComputedStyle(b);
            const rowA = parseInt(styleA.gridRowStart);
            const rowB = parseInt(styleB.gridRowStart);
            const colA = parseInt(styleA.gridColumnStart);
            const colB = parseInt(styleB.gridColumnStart);
            return rowA !== rowB ? rowB - rowA : colA - colB;
          });

          sorted.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add("animate-in");
            }, i * 200);
          });
        } else {
          // reset when section scrolls out of view
          items.forEach((el) => {
            el.classList.remove("animate-in");
          });
        }
      });
    },
    { threshold: 0.2 },
  );

  observer.observe(stackEl);
  return () => observer.disconnect();
}, []);

  return (
    <div className="stack">
      <p className="tech-stack">TECH STACK</p>
      {stack.map((item) => (
        <div key={item.id} className={`${item.name} logo-text`}>
          <img src={item.icon} alt={`${item.name} logo`} />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}
