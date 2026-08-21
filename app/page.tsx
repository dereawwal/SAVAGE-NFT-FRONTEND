"use client";

import { useEffect, useState } from "react";

type Stage =
  | "landing"
  | "identity"
  | "wallet"
  | "missions"
  | "complete";
type Savage = {
  username: string;
  wallet: string;
  savageId: string;
};
const nav = ["About", "Collection"];
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const missions = [
  {
    n: "01",
    title: "FOLLOW THE PACK",
    copy: "Follow @thesavagesnft on X.",
    action: "FOLLOW",
    href: "https://x.com/thesavagesnft",
  },
  {
    n: "02",
    title: "SHOW SUPPORT",
    copy: "Like and repost the pinned Savage post.",
    action: "VIEW PINNED POST",
    href: "https://x.com/thesavagesnft/status/2090543516770238924",
  },
  {
    n: "03",
    title: "LEAVE YOUR MARK",
    copy: "Comment and tell us why you belong in Savage.",
    action: "COMMENT",
    href: "https://x.com/thesavagesnft/status/2090543516770238924",
  },
];
export default function Home() {
  const [stage, setStage] = useState<Stage>("landing");
  const [username, setUsername] = useState("");
  const [wallet, setWallet] = useState("");
  const [done, setDone] = useState<boolean[]>([false, false, false]);
  const [profile, setProfile] = useState<Savage | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [whitelistOpen, setWhitelistOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    fetch(`${API_BASE}/api/whitelist/status`)
      .then((response) => response.json())
      .then((data) => setWhitelistOpen(data.open !== false))
      .catch(() => setWhitelistOpen(true));
  }, []);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("join") === "1") {
      setStage("identity");
    }
  }, []);
  useEffect(() => {
    if (whitelistOpen || stage !== "identity") return;
    const back = document.querySelector<HTMLElement>(
      ".identity-panel .eyebrow",
    );
    if (!back) return;
    const goBack = () => setStage("landing");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        goBack();
      }
    };
    back.setAttribute("role", "button");
    back.setAttribute("tabindex", "0");
    back.setAttribute("aria-label", "Back to Savage home");
    back.addEventListener("click", goBack);
    back.addEventListener("keydown", onKey);
    return () => {
      back.removeEventListener("click", goBack);
      back.removeEventListener("keydown", onKey);
    };
  }, [whitelistOpen, stage]);
  const step =
    stage === "identity"
      ? 1
      : stage === "wallet"
        ? 2
        : stage === "missions"
          ? 3
          : 0;
  const walletValid = /^0x[a-fA-F0-9]{40}$/.test(wallet);
  const allDone = done.every(Boolean);
  const openMission = (index: number, href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
    setDone((current) =>
      current.map((value, i) => (i === index ? true : value)),
    );
  };
  const join = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE}/api/whitelist`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, wallet, missions: done }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed");
      setProfile(data.profile);
      setStage("complete");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setStage("landing");
    setError("");
  };

  if (stage !== "landing")
    return (
      <main className="initiation-shell">
        <div className="grain" />
        <header className="initiation-header">
          <button className="brand" onClick={reset}>
            THE SAVAGE<span>NFT</span>
          </button>
          <div className="step-track">
            {[1, 2, 3].map((n) => (
              <i key={n} className={step >= n ? "active" : ""} />
            ))}
          </div>
          <span className="step-count">
            {step ? `0${step} / 03` : "SAVAGE ACCESS"}
          </span>
        </header>
        {stage === "identity" && (
          <section className="identity-panel">
            <div className="eyebrow">
              {whitelistOpen ? <><span>01</span> Identify yourself</> : <><span>←</span> Back</>}
            </div>
            <h1>
              {whitelistOpen ? (
                <>
                  WHAT’S
                  <br />
                  YOUR <em>@?</em>
                </>
              ) : (
                <>
                  THE GATES
                  <br />
                  <em>ARE CLOSED.</em>
                </>
              )}
            </h1>
            <p>
              {whitelistOpen
                ? "Your X identity is your first step into the Savage ecosystem."
                : "New whitelist registrations are currently paused."}
            </p>
            {whitelistOpen && (
              <form
                className="identity-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (username.trim().length > 1) setStage("wallet");
                }}
              >
                <label htmlFor="x-handle">X USERNAME</label>
                <div className="handle-field">
                  <span>@</span>
                  <input
                    id="x-handle"
                    value={username}
                    onChange={(e) =>
                      setUsername(
                        e.target.value
                          .replace(/[^a-zA-Z0-9_]/g, "")
                          .slice(0, 15),
                      )
                    }
                    placeholder="username"
                    autoFocus
                  />
                </div>
                <button
                  className="primary-cta"
                  disabled={username.trim().length < 2}
                >
                  CONTINUE
                </button>
              </form>
            )}
          </section>
        )}
        {stage === "wallet" && (
          <section className="identity-panel">
            <div className="eyebrow">
              <span>02</span> Register your wallet
            </div>
            <h1>
              WHERE SHOULD
              <br />
              YOUR <em>SAVAGE LIVE?</em>
            </h1>
            <p>
              One wallet. One identity. One Savage. No signature or transaction
              required.
            </p>
            <form
              className="identity-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (walletValid) setStage("missions");
              }}
            >
              <label htmlFor="wallet">EVM WALLET ADDRESS</label>
              <div
                className={`wallet-field ${wallet && !walletValid ? "invalid" : ""}`}
              >
                <input
                  id="wallet"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value.trim())}
                  placeholder="0x..."
                  autoFocus
                />
                <span>{walletValid ? "VALID ✓" : "EVM"}</span>
              </div>
              <button className="primary-cta" disabled={!walletValid}>
                VERIFY WALLET
              </button>
            </form>
          </section>
        )}
        {stage === "missions" && (
          <section className="mission-panel">
            <div className="eyebrow">
              <span>03</span> Prove you’re Savage
            </div>
            <h1>
              COMPLETE YOUR <em>INITIATION.</em>
            </h1>
            <div className="mission-grid">
              {missions.map((m, i) => (
                <article
                  className={done[i] ? "mission done" : "mission"}
                  key={m.n}
                >
                  <span>MISSION / {m.n}</span>
                  <div className="mission-mark">{done[i] ? "✓" : m.n}</div>
                  <h2>{m.title}</h2>
                  <p>{m.copy}</p>
                  <button onClick={() => openMission(i, m.href)}>
                    {done[i] ? "COMPLETED" : m.action}
                  </button>
                </article>
              ))}
            </div>
            <div className="mission-footer">
              <div>
                <span>IDENTITY</span>
                <div className="completion-bar">
                  <i
                    style={{
                      width: `${(done.filter(Boolean).length / 3) * 100}%`,
                    }}
                  />
                </div>
                <strong>
                  {Math.round((done.filter(Boolean).length / 3) * 100)}%
                </strong>
              </div>
              <button
                className="primary-cta"
                disabled={!allDone || loading}
                onClick={join}
              >
                {loading ? "REGISTERING..." : "COMPLETE INITIATION"}
              </button>
              {error && <p className="form-error">{error}</p>}
            </div>
          </section>
        )}
        {stage === "complete" && (
          <section className="complete-panel">
            <div className="burst" />
            <div className="eyebrow">
              <span>✓</span> Initiation complete
            </div>
            <h1>
              YOU’RE <em>IN.</em>
            </h1>
            <p>
              @{profile?.username || username} detected. Your place in the pack
              has been recorded.
            </p>
            <div className="id-ticket">
              <span>YOUR SAVAGE ID</span>
              <strong>{profile?.savageId || "SAVAGE / PENDING"}</strong>
              <small>DO NOT FOLLOW. LEAD.</small>
            </div>
            <button className="primary-cta" onClick={reset}>
              BACK TO HOME
            </button>
          </section>
        )}
        {step > 0 && (
          <aside className="access-meter">
            <span>SAVAGE ACCESS</span>
            <strong>{step * 33 + (step === 3 ? 1 : 0)}%</strong>
            <div>
              <i style={{ width: `${step * 33 + (step === 3 ? 1 : 0)}%` }} />
            </div>
            <small>
              {step === 1 ? "IDENTITY" : step === 2 ? "WALLET" : "INITIATION"}{" "}
              IN PROGRESS
            </small>
          </aside>
        )}
      </main>
    );

  return (
    <main className="landing" id="top">
      <div className="grain" />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className={`announcement ${whitelistOpen ? "" : "closed"}`}>
        <span>●</span>{" "}
        {whitelistOpen
          ? "WHITELIST TRANSMISSION ACTIVE — THE PACK IS FORMING"
          : "WHITELIST REGISTRATION PAUSED — THE GATES ARE CLOSED"}
      </div>
      <header className="site-header">
        <a className="brand" href="#top">
          THE SAVAGE<span>NFT</span>
        </a>
        <nav>
          {nav.map((item) => (
            <a key={item} href={item === "Collection" ? "/collection" : "/about?edition=editorial"}>
              {item}
              {item === "Collection" ? <sup> PREVIEW</sup> : null}
            </a>
          ))}
        </nav>
        <button className="nav-cta" onClick={() => setStage("identity")}>
          {whitelistOpen ? "JOIN THE SAVAGE" : "WHITELIST CLOSED"}
        </button>
        <button
          className={`mobile-menu-toggle ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span/><span/>
        </button>
      </header>
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`} id="mobile-navigation">
        <button onClick={() => { setMobileMenuOpen(false); setStage("identity"); }}>
          <small>01</small><strong>{whitelistOpen ? "JOIN THE SAVAGE" : "WHITELIST CLOSED"}</strong>
        </button>
        <a href="/collection" onClick={() => setMobileMenuOpen(false)}>
          <small>02</small><strong>COLLECTION</strong>
        </a>
        <a href="/about?edition=editorial" onClick={() => setMobileMenuOpen(false)}>
          <small>03</small><strong>ABOUT</strong><span>↓</span>
        </a>
      </div>
      <section className="hero">
        <div className="hero-copy">
          <h1>
            NOT EVERYONE
            <br />
            WAS MADE TO
            <br />
            <em>FIT IN.</em>
          </h1>
          <p>
            A collection built for the wild, the fearless and the ones who
            refuse to follow.
          </p>
          <div className="hero-actions">
            <button
              className="primary-cta"
              onClick={() => setStage("identity")}
            >
              ENTER THE SAVAGE WORLD
            </button>
          </div>
        </div>
        <div
          className="classified-stage"
          aria-label="Classified The Savage NFT previews"
        >
          <div className="halo" />
          <article className="nft-card card-left">
            <div className="silhouette">
              <i />
            </div>
            <small>SAVAGE / 002</small>
            <b>CLASSIFIED</b>
          </article>
          <article className="nft-card card-main">
            <div className="silhouette">
              <i />
            </div>
            <small>SAVAGE / 001</small>
            <b>CLASSIFIED</b>
            <span className="scanline" />
          </article>
          <article className="nft-card card-right">
            <div className="silhouette">
              <i />
            </div>
            <small>SAVAGE / 003</small>
            <b>CLASSIFIED</b>
          </article>
          <span className="coordinates">34°03′N / 118°15′W</span>
        </div>
        <div className="hero-meta">
          <div>
            <strong>XXXX</strong>
            <span>SAVAGES REGISTERED</span>
          </div>
          <div>
            <strong>03</strong>
            <span>INITIATION PHASES</span>
          </div>
          <div>
            <strong>∞</strong>
            <span>WAYS TO BE SAVAGE</span>
          </div>
        </div>
      </section>
      <div className="ticker">
        <div>
          BUILT DIFFERENT <i>◆</i> MINT SAVAGE <i>◆</i> THE WILD DON’T FOLLOW{" "}
          <i>◆</i> ENTER THE PACK <i>◆</i> BUILT DIFFERENT <i>◆</i> MINT SAVAGE
        </div>
      </div>
      <section className="home-featured">
        <div className="featured-copy">
          <div className="eyebrow"><span>SPOTLIGHT / 001</span> Featured Savage</div>
          <h2>MEET<br/><em>SAVAGE 006.</em></h2>
          <p>Unfiltered energy. An impossible grin. Zero interest in blending in. One of the first seven has stepped into the light.</p>
          <a href="/collection">EXPLORE THE COLLECTION</a>
        </div>
        <div className="featured-frame">
          <div className="featured-orbit" aria-hidden="true"><i/><i/><i/></div>
          <img src="/collection/savage-006.png" alt="Featured Savage number 006"/>
          <span>THE SAVAGE NFT / 006</span>
          <b>FEATURED</b>
        </div>
        <div className="featured-index" aria-hidden="true"><span>01</span><i/><span>07</span></div>
      </section>

      <section className="home-principles">
        <header><div className="eyebrow"><span>THE CODE / 003</span> What makes a Savage</div><h2>THREE RULES.<br/><em>NO APOLOGIES.</em></h2></header>
        <div className="principle-grid">
          {[["01","BE REAL","No masks. No borrowed identity. Show up exactly as you are."],["02","STAND OUT","Difference is the signal. Let the world notice your frequency."],["03","NEVER FOLLOW","Choose your own route—even when the crowd moves the other way."]].map(([n,title,copy])=><article key={n}><small>{n}</small><i/><h3>{title}</h3><p>{copy}</p><span>THE SAVAGE CODE</span></article>)}
        </div>
      </section>

      <section className="home-journey">
        <div className="journey-title"><div className="eyebrow"><span>ACCESS PROTOCOL</span> Your route into the pack</div><h2>FOUR MOVES.<br/><em>ONE ENTRY.</em></h2></div>
        <div className="journey-steps">
          {[["01","IDENTIFY","Enter your X username."],["02","REGISTER","Submit your EVM wallet."],["03","PROVE","Complete the X missions."],["04","ENTER","Secure your place in the pack."]].map(([n,title,copy],index)=><article key={n}><small>{n}</small><div><strong>{title}</strong><p>{copy}</p></div><span>{index===3?"✓":"→"}</span></article>)}
        </div>
        <button className="primary-cta" onClick={()=>setStage("identity")}>START YOUR INITIATION</button>
      </section>

      <section className="home-portals">
        <a href="/about?edition=editorial"><small>DISCOVER THE MINDSET</small><strong>ABOUT THE SAVAGES</strong></a>
        <a href="/collection"><small>MEET THE SAVAGES</small><strong>EXPLORE THE COLLECTION</strong></a>
        <a href="https://x.com/thesavagesnft" target="_blank" rel="noreferrer"><small>FOLLOW THE TRANSMISSION</small><strong>JOIN THE PACK ON X</strong></a>
      </section>

      <section className="home-finale">
        <div className="finale-portraits" aria-hidden="true"><img src="/collection/savage-004.png" alt=""/><img src="/collection/savage-001.png" alt=""/><img src="/collection/savage-007.png" alt=""/></div>
        <div className="finale-copy"><span>THE GATES WON’T STAY OPEN FOREVER.</span><h2>READY TO JOIN<br/><em>THE WILD SIDE?</em></h2><p>One identity. One wallet. Your place in The Savage NFT begins here.</p><div><button className="primary-cta" onClick={()=>setStage("identity")}>JOIN THE SAVAGE</button><a href="/collection">VIEW COLLECTION →</a></div></div>
      </section>
    </main>
  );
}
