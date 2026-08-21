const traits = [["LOUD","UNMISTAKABLE"],["LAID-BACK","UNBOTHERED"],["CHAOTIC","UNPREDICTABLE"],["COLORFUL","UNMISSABLE"],["MYSTERIOUS","UNREADABLE"]];

export default function AboutPage() {
  return <main className="editorial-about">
    <header className="editorial-nav"><a className="brand" href="/">THE SAVAGE<span>NFT</span></a><span>PROJECT FILE / 001</span><a href="/">CLOSE ×</a></header>
    <section className="editorial-hero">
      <div className="editorial-title"><small>THIS IS</small><h1>ABOUT</h1><strong>THE SAVAGE NFT</strong></div>
      <figure className="editorial-portrait"><img src="/collection/savage-006.png" alt="A smiling member of The Savage NFT collection"/><figcaption><span>PORTRAIT / 006</span><b>WILD BY DESIGN</b></figcaption></figure>
      <div className="editorial-lede"><span>THE IDEA</span><p>The Savage NFT is a collection built around individuality, attitude, and the freedom to be unapologetically yourself.</p></div>
      <i className="editorial-stamp">NO<br/>RULES</i>
    </section>
    <section className="editorial-belief"><div className="belief-number">01</div><div><small>WHAT WE BELIEVE</small><h2>THE WORLD SAYS<br/><em>FIT IN.</em><br/>WE SAY<br/><strong>STAND OUT.</strong></h2></div><p>In a world that constantly tells us how we’re supposed to look, act, and fit in, The Savages choose their own path.</p></section>
    <section className="editorial-spread">
      <figure className="spread-large"><img src="/collection/savage-003.png" alt="Colorful Savage portrait"/><span>COLOR IS AN ATTITUDE</span></figure>
      <div className="spread-copy"><small>ONE SPIRIT / INFINITE EXPRESSIONS</small><h2>NO TWO<br/>NEED TO<br/><em>LOOK ALIKE.</em></h2><p>Every Savage has a different look, personality, mood, and story. Some are loud. Some are laid-back. Some are chaotic. Some are colorful. Some are mysterious.</p><p>But they all share the same spirit: they don’t follow the crowd.</p></div>
      <figure className="spread-small"><img src="/collection/savage-002.png" alt="Laid-back Savage portrait"/><figcaption>PORTRAIT / 002</figcaption></figure>
    </section>
    <section className="editorial-traits"><div className="traits-heading"><small>CHARACTER STUDY</small><h2>FIVE MOODS.<br/>ZERO BOXES.</h2></div><div className="traits-list">{traits.map(([name,mood],index)=><article key={name}><small>0{index+1}</small><strong>{name}</strong><span>{mood}</span></article>)}</div></section>
    <section className="editorial-art"><div className="art-label"><span>02</span><small>THE ART</small></div><p>The art reflects that mindset—bold characters, expressive personalities, wild colors, and unexpected styles.</p><h2>BEING DIFFERENT<br/>IS THE <em>WHOLE POINT.</em></h2></section>
    <section className="editorial-finale"><figure><img src="/collection/savage-005.png" alt="Savage with red hair"/></figure><div><p>IT ISN’T ABOUT BEING PERFECT.<br/>IT’S ABOUT BEING REAL.<br/>IT’S ABOUT HAVING CHARACTER.</p><h2>WELCOME TO<br/><em>THE WILD SIDE.</em></h2><a href="/?join=1">JOIN THE SAVAGE</a></div></section>
  </main>;
}
