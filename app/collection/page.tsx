"use client";

import { useEffect, useState } from "react";

const collection = Array.from({ length: 7 }, (_, index) => ({
  id: String(index + 1).padStart(3, "0"),
  src: `/collection/savage-${String(index + 1).padStart(3, "0")}.png`,
}));

export default function CollectionPage() {
  const [selectedSavage, setSelectedSavage] = useState<number | null>(null);

  useEffect(() => {
    if (selectedSavage === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedSavage(null);
      if (event.key === "ArrowLeft") setSelectedSavage((selectedSavage + collection.length - 1) % collection.length);
      if (event.key === "ArrowRight") setSelectedSavage((selectedSavage + 1) % collection.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedSavage]);

  return (
    <main className="collection-page">
      <div className="grain" />
      <header className="collection-page-header">
        <a className="brand" href="/" aria-label="The Savage NFT home">THE SAVAGE<span>NFT</span></a>
        <a className="collection-back" href="/">← BACK TO HOME</a>
      </header>
      <section className="collection-showcase">
        <div className="collection-aura" aria-hidden="true" />
        <header className="collection-head">
          <div>
            <div className="eyebrow"><span>COLLECTION / 001—007</span></div>
            <h2>MEET THE<br/><em>SAVAGES.</em></h2>
          </div>
          <p>Seven faces. Seven moods. One refusal to blend in. The first members of The Savage NFT collection have stepped out of the shadows.</p>
        </header>
        <div className="collection-grid">
          {collection.map((savage,index)=><button className="collection-card" key={savage.id} onClick={()=>setSelectedSavage(index)} aria-label={`View Savage ${savage.id}`}>
            <span className="collection-image"><img src={savage.src} alt={`The Savage NFT ${savage.id}`} loading={index>2?"lazy":"eager"}/><i/></span>
            <span className="collection-meta"><small>THE SAVAGE NFT</small><strong>SAVAGE / {savage.id}</strong><b>VIEW</b></span>
          </button>)}
        </div>
        <div className="collection-track" aria-hidden="true"><span>GENESIS SEVEN</span><i/><span>MORE SAVAGES EMERGING</span></div>
      </section>
      {selectedSavage!==null&&<div className="collection-modal" role="dialog" aria-modal="true" aria-label={`Savage ${collection[selectedSavage].id} preview`} onClick={()=>setSelectedSavage(null)}>
        <button className="modal-close" onClick={()=>setSelectedSavage(null)} aria-label="Close collection preview">×</button>
        <button className="modal-nav modal-prev" onClick={event=>{event.stopPropagation();setSelectedSavage((selectedSavage+collection.length-1)%collection.length)}} aria-label="Previous Savage">←</button>
        <figure onClick={event=>event.stopPropagation()}><img src={collection[selectedSavage].src} alt={`The Savage NFT ${collection[selectedSavage].id}`}/><figcaption><span>GENESIS COLLECTION</span><strong>SAVAGE / {collection[selectedSavage].id}</strong></figcaption></figure>
        <button className="modal-nav modal-next" onClick={event=>{event.stopPropagation();setSelectedSavage((selectedSavage+1)%collection.length)}} aria-label="Next Savage">→</button>
      </div>}
    </main>
  );
}
