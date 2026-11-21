import { useEffect, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

type Tone = 'pink' | 'cyan' | 'yellow' | 'lime' | 'violet'

const SKILLS: { name: string; short: string; tag: string; tone: Tone }[] = [
  { name: 'TypeScript', short: 'TS', tag: 'daily driver', tone: 'cyan' },
  { name: 'React', short: 'RE', tag: 'ui building', tone: 'pink' },
  { name: 'Node.js', short: 'JS', tag: 'runtime fun', tone: 'lime' },
  { name: 'Rust', short: 'RS', tag: 'currently learning', tone: 'yellow' },
  { name: 'Vue.js', short: 'VU', tag: 'also fluent', tone: 'lime' },
  { name: 'Angular', short: 'NG', tag: 'in the toolbox', tone: 'violet' },
  { name: 'HTML5', short: 'HT', tag: 'the classics', tone: 'pink' },
  { name: 'CSS3', short: 'CS', tag: 'making it pretty', tone: 'cyan' },
  { name: 'Git', short: 'GT', tag: 'version control', tone: 'yellow' },
]

// Top 8 public repositories by stars (snapshot from the GitHub API).
const PROJECTS: {
  name: string
  desc: string
  lang: string
  tone: Tone
  stars: number
  url: string
}[] = [
  {
    name: 'taro-hooks',
    desc: 'Hooks library for Taro',
    lang: 'TypeScript',
    tone: 'cyan',
    stars: 452,
    url: 'https://github.com/innocces/taro-hooks',
  },
  {
    name: 'dumi-theme-chakra',
    desc: 'A Chakra UI theme for dumi 2',
    lang: 'TypeScript',
    tone: 'cyan',
    stars: 34,
    url: 'https://github.com/innocces/dumi-theme-chakra',
  },
  {
    name: 'taro-todolist',
    desc: 'TodoList for Taro',
    lang: 'TypeScript',
    tone: 'cyan',
    stars: 17,
    url: 'https://github.com/innocces/taro-todolist',
  },
  {
    name: 'father-plugin-less',
    desc: 'Shims the v1 lessInBabel feature in v4',
    lang: 'TypeScript',
    tone: 'cyan',
    stars: 10,
    url: 'https://github.com/innocces/father-plugin-less',
  },
  {
    name: 'wx-validInput',
    desc: '微信小程序校验输入框组件',
    lang: 'JavaScript',
    tone: 'yellow',
    stars: 10,
    url: 'https://github.com/innocces/wx-validInput',
  },
  {
    name: 'general-tools',
    desc: 'A tools website for anything',
    lang: 'TypeScript',
    tone: 'cyan',
    stars: 7,
    url: 'https://github.com/innocces/general-tools',
  },
  {
    name: 'trending',
    desc: 'GitHub trending, collected',
    lang: 'TypeScript',
    tone: 'cyan',
    stars: 3,
    url: 'https://github.com/innocces/trending',
  },
  {
    name: 'wx-promise-request',
    desc: 'A promise wrapper for wx.request',
    lang: 'JavaScript',
    tone: 'yellow',
    stars: 3,
    url: 'https://github.com/innocces/wx-promise-request',
  },
]

function Sparkle({
  className = '',
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg
      className={`sparkle ${className}`}
      style={style}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <path
        d="M50 0 C55 35 65 45 100 50 C65 55 55 65 50 100 C45 65 35 55 0 50 C35 45 45 35 50 0 Z"
        fill="currentColor"
      />
    </svg>
  )
}

function SponsorIcon({ kind }: { kind: 'heart' | 'coffee' }) {
  if (kind === 'heart') {
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path
          d="M50 88 C50 88 8 61 8 33 C8 17 20 7 34 7 C42 7 48 11 50 17 C52 11 58 7 66 7 C80 7 92 17 92 33 C92 61 50 88 50 88 Z"
          fill="currentColor"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <path
        d="M16 36 H70 V62 C70 77 60 87 46 87 H40 C26 87 16 77 16 62 Z"
        fill="currentColor"
      />
      <path
        d="M70 44 H78 C87 44 92 50 92 58 C92 66 86 72 78 72 H70"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
      />
      <path
        d="M30 26 C30 18 38 18 38 10 M52 26 C52 18 60 18 60 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ChromeText({ children }: { children: ReactNode }) {
  return (
    <span className="chrome-wrap">
      <span className="chrome-outline" aria-hidden="true">
        {children}
      </span>
      <span className="chrome-fill">{children}</span>
    </span>
  )
}

function Starburst({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const points = Array.from({ length: 24 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 24 - Math.PI / 2
    const radius = i % 2 === 0 ? 48 : 37
    return `${50 + radius * Math.cos(angle)},${50 + radius * Math.sin(angle)}`
  }).join(' ')

  return (
    <div className={`starburst ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <polygon
          points={points}
          fill="var(--yellow)"
          stroke="var(--navy)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
      <span>{children}</span>
    </div>
  )
}

function Window({
  title,
  tone = 'silver',
  children,
  className = '',
}: {
  title: string
  tone?: Tone | 'silver'
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`window window--${tone} ${className}`}>
      <div className="window__bar">
        <div className="window__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span className="window__title">{title}</span>
        <Sparkle className="window__bar-star" />
      </div>
      <div className="window__body">{children}</div>
    </div>
  )
}

export function HomePage() {
  const [clock, setClock] = useState('--:--')
  const [visitors, setVisitors] = useState(42)

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      )
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    root.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // storage may be unavailable — the toggle still works for this session
    }
  }

  return (
    <div className="page" id="top">
      {/* ---------- taskbar ---------- */}
      <header className="taskbar">
        <div className="taskbar__inner">
          <a className="taskbar__brand" href="#top">
            <Sparkle className="brand-star" />
            <span className="brand-name">ajiang.exe</span>
            <span className="status-led" title="online" aria-label="online" />
          </a>

          <nav className="taskbar__nav" aria-label="Main navigation">
            <a className="nav-btn" href="#top">
              home
            </a>
            <a className="nav-btn" href="#about">
              about
            </a>
            <a className="nav-btn" href="#skills">
              skills
            </a>
            <a className="nav-btn" href="#projects">
              work
            </a>
            <a className="nav-btn" href="#sponsor">
              sponsor
            </a>
            <a className="nav-btn" href="#links">
              links
            </a>
          </nav>

          <div className="taskbar__right">
            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              <svg
                className="theme-toggle__icon theme-toggle__icon--sun"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <circle cx="50" cy="50" r="22" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="8" strokeLinecap="round">
                  <path d="M50 4 V18 M50 82 V96 M4 50 H18 M82 50 H96" />
                  <path d="M17 17 L27 27 M73 73 L83 83 M83 17 L73 27 M27 73 L17 83" />
                </g>
              </svg>
              <svg
                className="theme-toggle__icon theme-toggle__icon--moon"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <path
                  d="M62 10 A44 44 0 1 0 90 62 A36 36 0 0 1 62 10 Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <span className="taskbar__clock">{clock}</span>
            <a className="start-btn" href="#links">
              <Sparkle className="start-star" />
              <span>start</span>
            </a>
          </div>
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__sun" aria-hidden="true" />
        <div className="hero__decor" aria-hidden="true">
          <Sparkle className="float-star float-star--a" />
          <Sparkle className="float-star float-star--b" />
          <Sparkle className="float-star float-star--c" />
          <Sparkle className="float-star float-star--d" />
          <Sparkle className="float-star float-star--e" />
        </div>

        <div className="hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">
              <span className="eyebrow__dot" />
              welcome to my corner of the web
            </p>

            <h1 className="hero__title" id="hero-title">
              <ChromeText>HI, I'M</ChromeText>
              <br />
              <span className="hero__name">AJIANG!</span>
            </h1>

            <p className="hero__subtitle">
              art designer <span className="subtitle-star">✦</span> part-time
              code wizard
            </p>

            <p className="hero__bio">
              I make pretty things on screen — and sometimes teach the computer
              to make them too. Welcome to my little pocket of the internet.
            </p>

            <div className="hero__actions">
              <a className="action-btn action-btn--primary" href="#about">
                explore my world <span aria-hidden="true">→</span>
              </a>
              <a className="action-btn action-btn--secondary" href="#links">
                say hello <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="hero__status" aria-label="Status">
              <span className="status-chip">
                <i className="status-dot status-dot--green" /> online
              </span>
              <span className="status-chip">
                <i className="status-dot status-dot--yellow" /> learning rust
              </span>
              <span className="status-chip">
                <i className="status-dot status-dot--pink" /> sleep &amp; game
              </span>
            </div>
          </div>

          <div className="hero__visual">
            <div className="avatar">
              <div className="avatar__halo" aria-hidden="true" />
              <div className="avatar__photo">
                <img
                  src="/avatar.png"
                  alt="Portrait of ajiang"
                  width="453"
                  height="453"
                />
              </div>
              <Starburst className="avatar__badge">NEW!</Starburst>
              <div className="avatar__tag">
                <Sparkle className="tag-star" />
                open to collabs
              </div>
              <Sparkle className="avatar__spark avatar__spark--1" />
              <Sparkle className="avatar__spark avatar__spark--2" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- marquee ---------- */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((group) => (
            <div className="marquee__group" key={group}>
              <span>welcome to my world</span>
              <span>✦</span>
              <span>best viewed at 800×600</span>
              <span>✦</span>
              <span>under construction</span>
              <span>✦</span>
              <span>made with a lot of curiosity</span>
              <span>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- about ---------- */}
      <section className="section" id="about" aria-labelledby="about-title">
        <div className="section__inner">
          <Window title="about_me.txt" tone="pink" className="about-window">
            <div className="about-grid">
              <div className="about-copy">
                <p className="section-kicker">01 / the human behind the pixels</p>
                <h2 id="about-title">
                  A LITTLE <ChromeText>ABOUT ME</ChromeText>
                </h2>
                <p className="lead">
                  Hey! I'm ajiang — an art designer who also make some code.
                  Somewhere between the color palette and the command line is
                  where I feel most at home.
                </p>
                <p className="body-text">
                  lately I've been learning rust, poking at command-line tools,
                  and collecting little green squares. Offline you'll usually
                  find me sleeping or playing games.
                </p>

                <div className="fact-row">
                  <div className="fact">
                    <span className="fact__label">currently</span>
                    <span className="fact__value">learning rust</span>
                  </div>
                  <div className="fact">
                    <span className="fact__label">offline</span>
                    <span className="fact__value">sleep &amp; game</span>
                  </div>
                  <div className="fact">
                    <span className="fact__label">pronouns</span>
                    <span className="fact__value">ajiang</span>
                  </div>
                </div>
              </div>

              <div className="snake-card">
                <div className="snake-card__bar">
                  <span>my_year_in_pixels.gif</span>
                  <Sparkle />
                </div>
                <div className="snake-card__screen">
                  <img
                    src="/snake.gif"
                    alt="GitHub contribution graph shaped like a pixel snake"
                    loading="lazy"
                  />
                </div>
                <p className="snake-card__caption">
                  365 days of showing up ✦
                </p>
              </div>
            </div>
          </Window>
        </div>
      </section>

      {/* ---------- skills ---------- */}
      <section className="section" id="skills" aria-labelledby="skills-title">
        <div className="section__inner">
          <Window title="skills.dll" tone="cyan">
            <div className="section-head">
              <p className="section-kicker">02 / the toolbox</p>
              <h2 id="skills-title">
                THINGS I <ChromeText>PLAY WITH</ChromeText>
              </h2>
              <p className="section-sub">
                a grab bag of languages, frameworks and pixels
              </p>
            </div>

            <div className="skills-grid">
              {SKILLS.map((skill) => (
                <div className={`skill-chip skill--${skill.tone}`} key={skill.name}>
                  <span className="skill-icon">{skill.short}</span>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-tag">{skill.tag}</span>
                </div>
              ))}
            </div>
          </Window>
        </div>
      </section>

      {/* ---------- projects ---------- */}
      <section className="section" id="projects" aria-labelledby="projects-title">
        <div className="section__inner">
          <Window title="projects.json" tone="violet">
            <div className="section-head">
              <p className="section-kicker">03 / things i've built</p>
              <h2 id="projects-title">
                SELECTED <ChromeText>WORK</ChromeText>
              </h2>
              <p className="section-sub">
                my eight most-starred public repositories ✦ data from GitHub
              </p>
            </div>

            <div className="projects-grid">
              {PROJECTS.map((project, index) => (
                <a
                  className={`project-card project-card--${project.tone}`}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  key={project.name}
                >
                  <div className="project-card__top">
                    <span className="project-card__rank">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="project-card__stars" aria-label={`${project.stars} stars`}>
                      ★ {project.stars}
                    </span>
                  </div>
                  <h3 className="project-card__name">{project.name}</h3>
                  <p className="project-card__desc">{project.desc}</p>
                  <div className="project-card__foot">
                    <span className="project-card__lang">
                      <i /> {project.lang}
                    </span>
                    <span className="project-card__go" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </Window>
        </div>
      </section>

      {/* ---------- sponsor ---------- */}
      <section className="section" id="sponsor" aria-labelledby="sponsor-title">
        <div className="section__inner">
          <Window title="sponsor_me.txt" tone="lime">
            <div className="sponsor">
              <div className="sponsor__copy">
                <p className="section-kicker">04 / keep the pixels flowing</p>
                <h2 id="sponsor-title">
                  ENJOY MY <ChromeText>STUFF?</ChromeText>
                </h2>
                <p className="lead">
                  If something here made your day a little better, you can buy
                  me a coffee. It keeps the late-night building sessions going.
                </p>
                <p className="sponsor__note">✦ no pressure — a kind word works too</p>
              </div>

              <div className="sponsor__cards">
                <a
                  className="sponsor-card sponsor-card--afdian"
                  href="https://afdian.com/a/innocces"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sponsor-card__icon">
                    <SponsorIcon kind="heart" />
                  </span>
                  <span className="sponsor-card__text">
                    <strong>Afdian</strong>
                    <small>爱发电 · 月度支持</small>
                  </span>
                  <span className="sponsor-card__arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>

                <a
                  className="sponsor-card sponsor-card--coffee"
                  href="https://buymeacoffee.com/innocces"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sponsor-card__icon">
                    <SponsorIcon kind="coffee" />
                  </span>
                  <span className="sponsor-card__text">
                    <strong>Buy Me a Coffee</strong>
                    <small>one-off · 请我喝杯咖啡</small>
                  </span>
                  <span className="sponsor-card__arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </Window>
        </div>
      </section>

      {/* ---------- contact ---------- */}
      <section className="section" id="links" aria-labelledby="links-title">
        <div className="section__inner">
          <Window title="say_hi.html" tone="yellow">
            <div className="contact-grid">
              <div className="contact-copy">
                <p className="section-kicker">05 / say hi</p>
                <h2 id="links-title">
                  LET'S MAKE <ChromeText>SOMETHING</ChromeText>
                </h2>
                <p className="lead">
                  Got an idea, a question, or just want to say hi? My messages
                  are always open.
                </p>

                <div className="contact-actions">
                  <a
                    className="link-btn link-btn--pink"
                    href="https://github.com/innocces"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github profile <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    className="link-btn link-btn--cyan"
                    href="https://github.com/innocces/innocces/issues"
                    target="_blank"
                    rel="noreferrer"
                  >
                    leave a message <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>

              <div className="guestbook">
                <div className="guestbook__inner">
                  <p className="guestbook__label">you are visitor number</p>
                  <button
                    className="guestbook__counter"
                    type="button"
                    onClick={() => setVisitors((n) => n + 1)}
                    aria-label={`Visitor number ${visitors}. Click to increment.`}
                  >
                    {String(visitors).padStart(6, '0')}
                  </button>
                  <p className="guestbook__hint">✦ click for good luck</p>
                </div>
                <span className="guestbook__sticker" aria-hidden="true">
                  ★
                </span>
              </div>
            </div>
          </Window>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__left">
            <Sparkle className="footer-star" />
            <span>© 2026 ajiang · handcrafted with care</span>
          </div>
          <div className="footer__badges">
            <span className="pixel-badge">BEST VIEWED AT 800×600</span>
            <span className="pixel-badge pixel-badge--blink">
              UNDER CONSTRUCTION
            </span>
          </div>
          <a className="back-top" href="#top">
            ↑ top
          </a>
        </div>
      </footer>
    </div>
  )
}
