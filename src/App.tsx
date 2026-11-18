import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Fingerprint,
  Menu,
  MonitorPlay,
  Play,
  X,
} from "lucide-react";
import bank from "./assets/centercredit.svg";
import college from "./assets/college.png";
import { HeroArt } from "./Art";
import {
  Architecture,
  Budget,
  Demo,
  Economics,
  Journey,
  Problem,
  Roadmap,
  Safety,
  Solution,
  ids,
  names,
} from "./Sections";

function Hero({ go }: { go: (i: number) => void }) {
  return (
    <>
      <div className="hero-main">
        <div className="hero-content">
          <div className="event">
            <span /> V региональный ITU HACKATHON-2026
          </div>
          <h1>
            BCC <em>Adapt</em>
          </h1>
          <h2>
            Банкинг, который
            <br />
            подстраивается под вас.
          </h2>
          <p>
            Персональный профиль доступности для bcc.kz. Размер текста,
            управление и голос подстраиваются под потребности человека.
          </p>
          <div className="hero-actions">
            <button className="btn mint" onClick={() => go(3)}>
              Настроить интерфейс <ArrowUpRight size={18} />
            </button>
            <button className="btn ghost" onClick={() => go(6)}>
              <Play size={15} /> Live Demo
            </button>
          </div>
          <div className="hero-logos">
            <img src={bank} alt="Банк ЦентрКредит" />
            <i />
            <img
              src={college}
              alt="Эмблема Жамбылского политехнического высшего колледжа"
            />
            <span>
              Жамбылский политехнический
              <br />
              высший колледж
            </span>
          </div>
        </div>
        <HeroArt />
      </div>
      <div className="hero-bottom">
        <span>
          <i /> Независимая конкурсная разработка
        </span>
        <span>Flutter / Android MVP</span>
        <button onClick={() => go(1)} aria-label="Перейти к проблемам клиентов">
          <ArrowDown size={17} />
        </button>
      </div>
    </>
  );
}

const bodies = [
  null,
  Problem,
  Solution,
  Journey,
  Safety,
  Architecture,
  Demo,
  Budget,
  Economics,
  Roadmap,
];
export default function App() {
  const [deck, setDeck] = useState(false),
    [current, setCurrent] = useState(0),
    [menu, setMenu] = useState(false);
  const returnFocus = useRef<HTMLButtonElement>(null),
    menuBtn = useRef<HTMLButtonElement>(null),
    main = useRef<HTMLElement>(null);
  function go(i: number) {
    setMenu(false);
    if (deck) {
      setCurrent(i);
      return;
    }
    const section = document.getElementById(ids[i]);
    section?.scrollIntoView();
    section?.focus({ preventScroll: true });
  }
  function leave() {
    setDeck(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    requestAnimationFrame(() => {
      document
        .getElementById(ids[current])
        ?.scrollIntoView({ behavior: "instant" });
      returnFocus.current?.focus({ preventScroll: true });
    });
  }
  function enter() {
    setMenu(false);
    setDeck(true);
    if (document.documentElement.requestFullscreen)
      document.documentElement.requestFullscreen().catch(() => {});
  }
  useEffect(() => {
    if (deck) {
      main.current?.scrollTo({ top: 0 });
      main.current?.focus({ preventScroll: true });
      return;
    }
    const track = () => {
      const y = window.innerHeight * 0.35;
      let idx = 0;
      ids.forEach((id, i) => {
        if (
          (document.getElementById(id)?.getBoundingClientRect().top ??
            Infinity) <= y
        )
          idx = i;
      });
      setCurrent(idx);
    };
    window.addEventListener("scroll", track, { passive: true });
    track();
    return () => window.removeEventListener("scroll", track);
  }, [deck, deck ? current : 0]);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (menu) {
          setMenu(false);
          menuBtn.current?.focus();
        } else if (deck) leave();
        return;
      }
      if (!deck || menu || e.altKey || e.ctrlKey || e.metaKey) return;
      const interactive = (e.target as HTMLElement).closest(
        "input,select,textarea,[contenteditable=true]",
      );
      if (
        interactive ||
        (e.key === " " && (e.target as HTMLElement).closest("button,a"))
      )
        return;
      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
        setCurrent((v) => Math.min(9, v + 1));
      }
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        setCurrent((v) => Math.max(0, v - 1));
      }
    }
    const fullscreen = () => {
      if (!document.fullscreenElement && deck) leave();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", fullscreen);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", fullscreen);
    };
  }, [deck, current, menu]);
  return (
    <div className={deck ? "app deck" : "app"}>
      <a href="#main" className="skip">
        К содержанию
      </a>
      <header className="topbar">
        <div className="top-inner">
          <button
            className="brand"
            onClick={() => go(0)}
            aria-label="BCC Adapt — начало"
          >
            <Fingerprint />
            <span>
              BCC <b>Adapt</b>
            </span>
          </button>
          <nav className="primary-nav" aria-label="Основная навигация">
            {[
              [0, "Обзор"],
              [2, "Решение"],
              [5, "Архитектура"],
              [8, "Экономика"],
            ].map(([i, label]) => (
              <button
                key={i}
                className={current === i ? "active" : ""}
                onClick={() => go(+i)}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="nav-tools">
            <button
              className="present"
              ref={returnFocus}
              onClick={deck ? leave : enter}
            >
              {deck ? <X /> : <MonitorPlay />}
              <span>{deck ? "Выйти" : "Презентация"}</span>
            </button>
            <button
              ref={menuBtn}
              className="menu-btn"
              aria-expanded={menu}
              aria-controls="section-menu"
              aria-label={menu ? "Закрыть оглавление" : "Открыть оглавление"}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menu && (
          <>
            <button
              className="scrim"
              tabIndex={-1}
              aria-label="Закрыть меню"
              onClick={() => setMenu(false)}
            />
            <nav id="section-menu" aria-label="Оглавление">
              {names.map((n, i) => (
                <button
                  key={n}
                  aria-current={current === i ? "location" : undefined}
                  onClick={() => go(i)}
                >
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  {n}
                  <ArrowDownRight size={14} />
                </button>
              ))}
            </nav>
          </>
        )}
      </header>
      <main ref={main} id="main" tabIndex={-1}>
        {names.map((name, i) => {
          if (deck && i !== current) return null;
          const Body = bodies[i];
          return (
            <section
              key={name}
              aria-label={name}
              tabIndex={-1}
              id={ids[i]}
              className={
                "section s" +
                i +
                " " +
                ([0, 2, 5, 6, 9].includes(i) ? "dark" : "light")
              }
            >
              <motion.div
                initial={{ opacity: 0.86, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42 }}
                className="wrap"
              >
                {Body ? <Body /> : <Hero go={go} />}
              </motion.div>
            </section>
          );
        })}
      </main>
      {deck ? (
        <footer className="deck-controls">
          <span aria-live="polite">
            {String(current + 1).padStart(2, "0")} / 10 · {names[current]}
          </span>
          <progress aria-label="Прогресс показа" value={current + 1} max={10} />
          <button
            disabled={!current}
            onClick={() => go(current - 1)}
            aria-label="Назад"
          >
            <ArrowLeft />
          </button>
          <button
            disabled={current === 9}
            onClick={() => go(current + 1)}
            aria-label="Далее"
          >
            <ArrowRight />
          </button>
        </footer>
      ) : (
        <footer className="site-footer">
          <span>BCC Adapt · 2026</span>
          <button onClick={() => go(0)}>К началу ↑</button>
        </footer>
      )}
    </div>
  );
}
