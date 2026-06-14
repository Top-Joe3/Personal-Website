import { About, Portfolio, Contact } from "./components/components.jsx";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import light from "./assets/icons/light_mode.png";
import dark from "./assets/icons/dark_mode.png";

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [activeSection, setActiveSection] = useState("");
  const about = useRef(null);
  const portfolio = useRef(null);
  const contact = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  
  useEffect(() => {
  function handleScroll() {
    const sections = [
      { id: "about",     ref: about },
      { id: "portfolio", ref: portfolio },
      { id: "contact",   ref: contact },
    ];

    // if at the bottom of the page, force last section active
    const atBottom =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;

    if (atBottom) {
      setActiveSection("contact");
      return;
    }

    const scrollY = window.scrollY + window.innerHeight / 3;

    let current = sections[0].id;
    sections.forEach(({ id, ref }) => {
      if (ref.current && ref.current.offsetTop <= scrollY) {
        current = id;
      }
    });

    setActiveSection(current);
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  function handleClickTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }
  return (
    <>
      <header>
        <p>JA</p>
        <nav>
          <a
            href="#about"
            className={activeSection === "about" ? "active" : ""}
          >
            About
          </a>
          <a
            href="#portfolio"
            className={activeSection === "portfolio" ? "active" : ""}
          >
            Portfolio
          </a>
          <a
            href="#contact"
            className={activeSection === "contact" ? "active" : ""}
          >
            Contact
          </a>
        </nav>
        <span onClick={handleClickTheme}>
          {theme === "light" ? (
            <img src={dark} className="dark-mode" />
          ) : (
            <img src={light} className="light-mode" />
          )}
        </span>
      </header>
      <main>
        <section aria-label="About me" id="about" ref={about}>
          <About />
        </section>
        <section aria-label="Portfolio" id="portfolio" ref={portfolio}>
          <Portfolio />
        </section>
        <section aria-label="Contact" id="contact" ref={contact}>
          <Contact theme={theme}/>
        </section>
      </main>
      <footer>
        <p>
          &copy; {new Date().toLocaleString("en-GB", { year: "numeric" })}{" "}
          Joseph Ackumey
        </p>
      </footer>
    </>
  );
}
